/**
 * 올댓아트 상담 예약 폼 + 자동 문자 발송 (구글 앱스 스크립트 + 알리고 API)
 *
 * 한 번에 해주는 일
 *   1) setupForm()  : 상담 예약 구글폼 + 응답 스프레드시트를 새로 만들고, 제출 시 문자가 나가도록 연결
 *   2) onFormSubmit : 폼이 제출될 때마다 신청자·담당자에게 문자 발송
 *   3) setupBooking / doGet / doPost : 사이트 예약 화면용. 같은 날짜·시간 중복 예약 방지 (아래 "사이트 상담 예약" 참고)
 *
 * 사용 위치: https://script.google.com → 새 프로젝트 (폼을 소유할 구글 계정으로 로그인)
 *
 * 비밀번호/키는 이 코드에 직접 쓰지 않고,
 * Apps Script 왼쪽 ⚙ "프로젝트 설정" → "스크립트 속성"에 아래 이름으로 저장합니다.
 *
 *   ALIGO_KEY      알리고 API Key
 *   ALIGO_USER_ID  알리고 아이디
 *   ALIGO_SENDER   알리고에 등록·인증된 발신번호 (숫자만, 예: 01012345678)
 *   STAFF_PHONES   학원 담당자 휴대폰 (숫자만, 여러 명이면 쉼표로: 01011112222,01033334444)
 *   TESTMODE       처음 테스트할 때만 Y (실제 발송·과금 없이 연동만 확인). 실사용 시 N 또는 삭제
 *   ALERT_EMAIL    (선택) 발송 실패 시 알림을 받을 이메일
 *
 * 솔라피(Solapi)로 발송할 때는 아래 속성을 추가합니다.
 *   PROVIDER          SOLAPI
 *   SOLAPI_API_KEY    솔라피 API Key
 *   SOLAPI_API_SECRET 솔라피 API Secret
 *   SENDER            솔라피에 등록된 발신번호 (없으면 ALIGO_SENDER 값을 씁니다)
 */

// ── 문자 내용: 여기 문구만 고치면 됩니다 ─────────────────────────────
var ACADEMY_NAME = '올댓아트';

function buildCustomerMessage_(f) {
  return [
    '[' + ACADEMY_NAME + '] ' + f.name + '님, 상담 예약이 접수되었습니다.',
    '',
    '- 희망 일시: ' + f.date + ' ' + f.time,
    '- 상담 유형: ' + f.type,
    '',
    '확인 후 순차적으로 연락드리겠습니다. 감사합니다.',
  ].join('\n');
}

function buildStaffMessage_(f) {
  return [
    '[새 상담 신청]',
    '이름: ' + f.name,
    '연락처: ' + f.phone,
    '희망 일시: ' + f.date + ' ' + f.time,
    '상담 유형: ' + f.type,
    '희망 전공: ' + f.major,
    '문의: ' + f.memo,
  ].join('\n');
}

// ── 신청자·담당자에게 문자 발송 (구글폼 / 사이트 예약 공용) ────────────
function notifyBooking_(f) {
  var props = PropertiesService.getScriptProperties();

  var customerPhone = normalizePhone_(f.phone);
  var results = [];

  if (customerPhone) {
    results.push(sendSms_(customerPhone, buildCustomerMessage_(f), ACADEMY_NAME + ' 상담예약'));
  } else {
    results.push('고객 번호 오류: "' + f.phone + '" (문자 미발송)');
  }

  var staff = (props.getProperty('STAFF_PHONES') || '')
    .split(',')
    .map(normalizePhone_)
    .filter(Boolean);
  if (staff.length) {
    results.push(sendSms_(staff.join(','), buildStaffMessage_(f), '새 상담 신청'));
  }

  var failed = results.filter(function (r) { return r !== 'OK'; });
  if (failed.length) {
    notifyFailure_(f, failed);
  }
}

// ── 구글폼 제출 시 자동 실행되는 함수 (트리거로 연결) ───────────────────
function onFormSubmit(e) {
  notifyBooking_(readForm_(e.namedValues || namedFromResponse_(e.response)));
}

// ── 처음 한 번만 실행: 폼 + 응답 시트 + 자동 문자 연결 만들기 ───────────
function setupForm() {
  var props = PropertiesService.getScriptProperties();
  if (props.getProperty('FORM_ID')) {
    Logger.log('이미 만들어져 있습니다. 폼 주소: ' + FormApp.openById(props.getProperty('FORM_ID')).getPublishedUrl());
    return;
  }

  var form = FormApp.create('올댓아트 상담 예약 신청서');
  form.setDescription(
    '예약이 정상적으로 접수되면 기입하신 휴대전화 번호로 문자메시지가 발송됩니다.\n' +
    '본 예약은 희망일자 신청 용도로 사용되며, 확인 전화 이후에 상담일자가 확정됩니다.'
  );
  form.setConfirmationMessage('상담 예약이 접수되었습니다. 감사합니다.');
  setPublic_(form);

  form.addDateItem().setTitle('예약일자').setRequired(true);
  form.addListItem().setTitle('예약시간').setRequired(true)
    .setChoiceValues(['15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']);
  form.addTextItem().setTitle('이름').setRequired(true);
  form.addTextItem().setTitle('전화번호').setRequired(true)
    .setHelpText('휴대폰 번호를 010-1234-5678 형식으로 입력해 주세요.')
    .setValidation(
      FormApp.createTextValidation()
        .setHelpText('휴대폰 번호를 010-1234-5678 형식으로 입력해 주세요.')
        .requireTextMatchesPattern('^01[016789]-?[0-9]{3,4}-?[0-9]{4}$')
        .build()
    );
  form.addListItem().setTitle('최종학력').setRequired(true)
    .setChoiceValues(['중학교 재학', '중학교 졸업', '고등학교 재학', '고등학교 졸업',
                      '대학교 재학', '대학교 졸업', '대학원 재학', '대학원 졸업']);
  form.addTextItem().setTitle('희망전공');
  form.addTextItem().setTitle('희망대학');
  form.addListItem().setTitle('알게된 경로').setRequired(true)
    .setChoiceValues(['소개', '홈페이지', '블로그', '기타']);
  form.addMultipleChoiceItem().setTitle('상담유형')
    .setChoiceValues(['방문 상담 [구체적인 진학상담]', '전화 상담 [간단한 질의응답]']);
  form.addParagraphTextItem().setTitle('추가 문의사항');

  // 응답이 쌓이는 스프레드시트
  var ss = SpreadsheetApp.create('올댓아트 상담 예약 신청서 (응답)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // 폼이 제출될 때마다 onFormSubmit 자동 실행
  ScriptApp.newTrigger('onFormSubmit').forForm(form).onFormSubmit().create();

  props.setProperty('FORM_ID', form.getId());
  Logger.log('폼 주소(홈페이지에 연결할 주소): ' + form.getPublishedUrl());
  Logger.log('폼 수정 주소: ' + form.getEditUrl());
  Logger.log('응답 시트 주소: ' + ss.getUrl());
}

// 로그인 없이 누구나 작성할 수 있게 합니다.
function setPublic_(form) {
  form.setRequireLogin(false);
  form.setLimitOneResponsePerUser(false);
  form.setAcceptingResponses(true);
}

// 이미 만들어진 폼을 공개로 바꿀 때 한 번 실행합니다.
function makeFormPublic() {
  var id = PropertiesService.getScriptProperties().getProperty('FORM_ID');
  var form = FormApp.openById(id);
  setPublic_(form);
  Logger.log('공개 설정 완료. 로그인 필요 여부: ' + form.requiresLogin());
}

// 폼 트리거로 들어온 응답을 { 질문제목: [답변] } 형태로 바꿉니다.
function namedFromResponse_(response) {
  var named = {};
  response.getItemResponses().forEach(function (r) {
    named[r.getItem().getTitle()] = [String(r.getResponse() || '')];
  });
  return named;
}

// ═══════════════════════════════════════════════════════════════════
// 사이트 상담 예약 (같은 날짜·시간 중복 예약 방지)
//
// 홈페이지의 예약 화면이 이 웹 앱에 요청을 보냅니다.
//   - doGet  : 예약 가능한 날짜/시간과 이미 예약된 시간 목록을 돌려줌
//   - doPost : 예약 접수. 같은 날짜·시간이 이미 있으면 거절(중복 방지)
//
// 처음 한 번: setupBooking() 실행 → 배포 → 새 배포 → 웹 앱
//   (실행 사용자: 나 / 액세스 권한: 모든 사용자) → 웹 앱 URL을 홈페이지에 연결
// ═══════════════════════════════════════════════════════════════════
var TZ = 'Asia/Seoul';
var TIME_SLOTS = ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']; // 예약 가능한 시간
var BOOKING_DAYS = 30;        // 오늘부터 며칠 뒤까지 예약을 받을지
var CLOSED_WEEKDAYS = [];     // 예약을 받지 않는 요일 (0=일, 1=월 … 6=토). 예: [0] 이면 일요일 휴무
var MAX_ACTIVE_PER_PHONE = 2; // 같은 번호로 동시에 가질 수 있는 예약 수
var BOOKING_HEADERS = ['접수시각', '예약일자', '예약시간', '이름', '전화번호', '최종학력',
                       '희망전공', '희망대학', '알게된 경로', '상담유형', '추가 문의사항', '상태'];

// 처음 한 번만 실행: 예약이 쌓이는 시트를 만듭니다.
function setupBooking() {
  var props = PropertiesService.getScriptProperties();
  if (props.getProperty('BOOKING_SHEET_ID')) {
    Logger.log('이미 만들어져 있습니다. 예약 현황 시트: ' +
      SpreadsheetApp.openById(props.getProperty('BOOKING_SHEET_ID')).getUrl());
    return;
  }
  var ss = SpreadsheetApp.create('올댓아트 상담 예약 현황');
  var sh = ss.getSheets()[0];
  sh.setName('예약');
  sh.getRange(1, 1, sh.getMaxRows(), BOOKING_HEADERS.length).setNumberFormat('@'); // 날짜·번호가 변형되지 않게 글자로 저장
  sh.getRange(1, 1, 1, BOOKING_HEADERS.length).setValues([BOOKING_HEADERS]).setFontWeight('bold');
  sh.setFrozenRows(1);
  props.setProperty('BOOKING_SHEET_ID', ss.getId());
  Logger.log('예약 현황 시트: ' + ss.getUrl());
  Logger.log('이제 배포 → 새 배포 → 웹 앱으로 배포하세요.');
}

function bookingSheet_() {
  var id = PropertiesService.getScriptProperties().getProperty('BOOKING_SHEET_ID');
  return SpreadsheetApp.openById(id).getSheetByName('예약');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function todayStr_() { return Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd'); }

function addDaysStr_(str, n) {
  var p = str.split('-');
  var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]) + n);
  return Utilities.formatDate(d, TZ, 'yyyy-MM-dd');
}

function weekdayOf_(str) {
  var p = str.split('-');
  return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2])).getDay();
}

// 시트 칸 값을 글자로 통일합니다. (직원이 직접 고쳐서 날짜/시간 형식으로 바뀐 경우 대비)
function cellText_(v, fmt) {
  if (v instanceof Date) return Utilities.formatDate(v, TZ, fmt);
  return String(v == null ? '' : v).trim();
}

// 취소되지 않은 예약 목록
function activeBookings_() {
  var sh = bookingSheet_();
  var last = sh.getLastRow();
  if (last < 2) return [];
  return sh.getRange(2, 1, last - 1, BOOKING_HEADERS.length).getValues()
    .map(function (r) {
      return {
        date: cellText_(r[1], 'yyyy-MM-dd'),
        time: cellText_(r[2], 'HH:mm'),
        phone: normalizePhone_(r[4]),
        status: cellText_(r[11], 'yyyy-MM-dd'),
      };
    })
    .filter(function (b) { return b.date && b.time && b.status !== '취소'; });
}

function doGet() {
  try {
    var today = todayStr_();
    var booked = {};
    activeBookings_().forEach(function (b) {
      if (b.date >= today) (booked[b.date] = booked[b.date] || []).push(b.time);
    });
    return json_({
      ok: true,
      today: today,
      now: Utilities.formatDate(new Date(), TZ, 'HH:mm'),
      days: BOOKING_DAYS,
      slots: TIME_SLOTS,
      closedWeekdays: CLOSED_WEEKDAYS,
      booked: booked,
    });
  } catch (err) {
    Logger.log('doGet 오류: ' + err);
    return json_({ ok: false, error: 'server' });
  }
}

function clean_(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max);
}

// 접수 내용을 검사해 정리합니다. 문제가 있으면 { error: '코드' }
function cleanBooking_(d) {
  var f = {
    name: clean_(d.name, 40),
    phone: normalizePhone_(d.phone),
    date: clean_(d.date, 10),
    time: clean_(d.time, 5),
    edu: clean_(d.edu, 30),
    major: clean_(d.major, 60),
    univ: clean_(d.univ, 60),
    route: clean_(d.route, 30),
    type: clean_(d.type, 60),
    memo: String(d.memo == null ? '' : d.memo).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]+/g, ' ').trim().slice(0, 1000),
  };
  if (!f.name) return { error: 'invalid_name' };
  if (!f.phone) return { error: 'invalid_phone' };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(f.date)) return { error: 'invalid_date' };
  var today = todayStr_();
  if (f.date < today || f.date > addDaysStr_(today, BOOKING_DAYS)) return { error: 'invalid_date' };
  if (CLOSED_WEEKDAYS.indexOf(weekdayOf_(f.date)) !== -1) return { error: 'invalid_date' };
  if (TIME_SLOTS.indexOf(f.time) === -1) return { error: 'invalid_time' };
  if (f.date === today && f.time <= Utilities.formatDate(new Date(), TZ, 'HH:mm')) return { error: 'past' };
  if (!f.edu || !f.route) return { error: 'invalid' };
  return f;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  var locked = false;
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.website) return json_({ ok: true }); // 자동 입력 프로그램(스팸) 걸러내기
    var f = cleanBooking_(d);
    if (f.error) return json_({ ok: false, error: f.error });

    // 동시에 두 사람이 접수해도 한 사람씩만 처리되도록 잠급니다.
    lock.waitLock(20000);
    locked = true;

    var today = todayStr_();
    var active = activeBookings_();
    if (active.some(function (b) { return b.date === f.date && b.time === f.time; })) {
      return json_({ ok: false, error: 'slot_taken' });
    }
    var mine = active.filter(function (b) { return b.phone === f.phone && b.date >= today; }).length;
    if (mine >= MAX_ACTIVE_PER_PHONE) return json_({ ok: false, error: 'too_many' });

    bookingSheet_().appendRow([
      Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss'),
      f.date, f.time, f.name, f.phone, f.edu, f.major, f.univ, f.route, f.type, f.memo, '접수',
    ]);
    SpreadsheetApp.flush();
    lock.releaseLock();
    locked = false;

    // 접수가 끝난 뒤 문자 발송 (문자가 실패해도 예약은 유지)
    notifyBooking_({
      name: f.name, phone: f.phone, date: f.date, time: f.time,
      type: f.type || '-', major: f.major || '-', memo: f.memo || '-',
    });
    return json_({ ok: true });
  } catch (err) {
    Logger.log('doPost 오류: ' + err);
    return json_({ ok: false, error: 'server' });
  } finally {
    if (locked) lock.releaseLock();
  }
}

// ── 설정 확인용: Apps Script 편집기에서 이 함수를 선택해 ▶ 실행 ────────
// 담당자 번호(STAFF_PHONES)로 테스트 문자를 한 통 보냅니다.
function sendTestSms() {
  var props = PropertiesService.getScriptProperties();
  var to = (props.getProperty('STAFF_PHONES') || '').split(',')[0];
  var result = sendSms_(normalizePhone_(to), '[' + ACADEMY_NAME + '] 문자 발송 테스트입니다.', '테스트');
  Logger.log(result);
}

// ── 아래는 건드리지 않아도 되는 부분 ───────────────────────────────────

// 응답 시트의 제목(헤더)에 해당 단어가 들어 있는 칸의 값을 가져옵니다.
function pick_(named, keyword) {
  var keys = Object.keys(named);
  for (var i = 0; i < keys.length; i++) {
    if (keys[i].indexOf(keyword) !== -1) {
      var v = named[keys[i]];
      return String((v && v[0]) || '').trim();
    }
  }
  return '';
}

function readForm_(named) {
  return {
    name: pick_(named, '이름') || '고객',
    phone: pick_(named, '전화번호'),
    date: pick_(named, '예약일자') || '-',
    time: pick_(named, '예약시간') || '',
    type: pick_(named, '상담유형') || '-',
    major: pick_(named, '희망전공') || '-',
    memo: pick_(named, '추가 문의') || '-',
  };
}

// 010-1234-5678, +82 10 1234 5678 → 01012345678 (휴대폰 형식이 아니면 빈 값)
function normalizePhone_(raw) {
  var d = String(raw || '').replace(/[^0-9]/g, '');
  if (d.indexOf('82') === 0) d = '0' + d.substring(2);
  return /^01[016789][0-9]{7,8}$/.test(d) ? d : '';
}

// PROVIDER 속성이 SOLAPI이면 솔라피로, 아니면 알리고로 발송합니다.
function sendSms_(receiver, msg, title) {
  var provider = PropertiesService.getScriptProperties().getProperty('PROVIDER');
  return provider === 'SOLAPI'
    ? sendSolapi_(receiver, msg, title)
    : sendAligo_(receiver, msg, title);
}

// 솔라피: https://solapi.com (API Key + API Secret, HMAC-SHA256 서명)
function sendSolapi_(receiver, msg, title) {
  var p = PropertiesService.getScriptProperties();
  var apiKey = p.getProperty('SOLAPI_API_KEY');
  var apiSecret = p.getProperty('SOLAPI_API_SECRET');
  var sender = p.getProperty('SENDER') || p.getProperty('ALIGO_SENDER');

  var messages = String(receiver).split(',').map(function (to) {
    return { to: to, from: sender, text: msg, type: 'LMS', subject: title };
  });

  var date = new Date().toISOString();
  var salt = Utilities.getUuid().replace(/-/g, '');
  var sigBytes = Utilities.computeHmacSha256Signature(date + salt, apiSecret);
  var signature = sigBytes.map(function (b) {
    return ('0' + (b & 0xff).toString(16)).slice(-2);
  }).join('');

  try {
    var res = UrlFetchApp.fetch('https://api.solapi.com/messages/v4/send-many/detail', {
      method: 'post',
      contentType: 'application/json',
      headers: {
        Authorization: 'HMAC-SHA256 apiKey=' + apiKey + ', date=' + date +
          ', salt=' + salt + ', signature=' + signature,
      },
      payload: JSON.stringify({ messages: messages }),
      muteHttpExceptions: true,
    });
    var body = JSON.parse(res.getContentText());
    var failed = body.failedMessageList || [];
    if (res.getResponseCode() < 400 && !body.errorCode && failed.length === 0) return 'OK';
    Logger.log('솔라피 오류: ' + res.getContentText());
    return '솔라피 오류 ' + (body.errorCode || res.getResponseCode()) + ': ' +
      (body.errorMessage || JSON.stringify(failed[0] || body));
  } catch (err) {
    Logger.log('발송 예외: ' + err);
    return '발송 예외: ' + err;
  }
}

// 알리고: https://smartsms.aligo.in (발송 서버 IP 등록이 필요함)
function sendAligo_(receiver, msg, title) {
  var p = PropertiesService.getScriptProperties();
  var payload = {
    key: p.getProperty('ALIGO_KEY'),
    user_id: p.getProperty('ALIGO_USER_ID'),
    sender: p.getProperty('ALIGO_SENDER'),
    receiver: receiver,
    msg: msg,
    msg_type: 'LMS', // 한글은 45자를 넘으면 장문(LMS)이라 처음부터 LMS로 보냅니다
    title: title,
  };
  if (p.getProperty('TESTMODE') === 'Y') payload.testmode_yn = 'Y';

  try {
    var res = UrlFetchApp.fetch('https://apis.aligo.in/send/', {
      method: 'post',
      payload: payload,
      muteHttpExceptions: true,
    });
    var body = JSON.parse(res.getContentText());
    if (Number(body.result_code) === 1) return 'OK';
    Logger.log('알리고 오류: ' + res.getContentText());
    return '알리고 오류 ' + body.result_code + ': ' + body.message;
  } catch (err) {
    Logger.log('발송 예외: ' + err);
    return '발송 예외: ' + err;
  }
}

function notifyFailure_(f, failed) {
  var to = PropertiesService.getScriptProperties().getProperty('ALERT_EMAIL');
  if (!to) return;
  MailApp.sendEmail(
    to,
    '[올댓아트] 상담 예약 문자 발송 실패',
    '신청자: ' + f.name + ' / ' + f.phone + '\n\n' + failed.join('\n')
  );
}
