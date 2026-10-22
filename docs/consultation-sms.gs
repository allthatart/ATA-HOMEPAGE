/**
 * 올댓아트 상담 예약 폼 + 자동 문자 발송 (구글 앱스 스크립트 + 알리고 API)
 *
 * 한 번에 해주는 일
 *   1) setupForm()  : 상담 예약 구글폼 + 응답 스프레드시트를 새로 만들고, 제출 시 문자가 나가도록 연결
 *   2) onFormSubmit : 폼이 제출될 때마다 신청자·담당자에게 문자 발송
 *   3) setupBooking / doGet / doPost : 사이트 예약 화면용. 중복 예약 방지 + 학원이 확정/거절 (아래 "사이트 상담 예약" 참고)
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

var ACADEMY_PHONE = '02-3443-9894';
var ACADEMY_ADDRESS = '서울시 강남구 논현로168길 25 (압구정역 3번 출구에서 약 300m)';

// 1) 신청 접수 (학원이 확인하기 전)
function buildCustomerMessage_(f) {
  return [
    '[' + ACADEMY_NAME + '] ' + f.name + '님, 상담 신청이 접수되었습니다.',
    '',
    '- 희망 일시: ' + f.date + ' ' + f.time,
    '- 상담 유형: ' + f.type,
    '',
    '학원에서 확인 후 확정 여부를 문자로 안내드립니다.',
    '(확정 문자를 받기 전에는 예약이 확정된 것이 아닙니다.)',
  ].join('\n');
}

// 2) 학원 담당자에게 가는 알림 (확인 링크 포함)
function buildStaffMessage_(f) {
  var lines = [
    '[새 상담 신청]',
    '이름: ' + f.name,
    '연락처: ' + f.phone,
    '희망 일시: ' + f.date + ' ' + f.time,
    '상담 유형: ' + f.type,
    '희망 전공: ' + f.major,
  ];
  if (f.route) lines.push('알게된 경로: ' + f.route);
  lines.push('문의: ' + f.memo);
  if (f.reviewUrl) {
    lines.push('', '▶ 확정/거절하기', f.reviewUrl);
  }
  return lines.join('\n');
}

// 3) 학원이 확정했을 때 신청자에게
function buildConfirmMessage_(f) {
  return [
    '[' + ACADEMY_NAME + '] ' + f.name + '님, 상담이 확정되었습니다.',
    '',
    '- 일시: ' + f.date + ' ' + f.time,
    '- 장소: ' + ACADEMY_ADDRESS,
    '- 문의: ' + ACADEMY_PHONE,
    '',
    '방문을 기다리겠습니다. 감사합니다.',
  ].join('\n');
}

// 4) 학원이 거절했을 때 신청자에게
function buildRejectMessage_(f) {
  return [
    '[' + ACADEMY_NAME + '] ' + f.name + '님, 요청하신 ' + f.date + ' ' + f.time + ' 상담은 일정상 진행이 어렵습니다.',
    '',
    '홈페이지에서 다른 날짜·시간으로 다시 신청하시거나 ' + ACADEMY_PHONE + '로 문의해 주세요.',
    '죄송합니다.',
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
  return results;
}

// 문자 결과를 사람이 읽을 글로 바꿉니다. ('OK' → 성공, 그 밖에는 실패 이유)
function smsText_(r) {
  if (r === undefined) return '-';
  return r === 'OK' ? '성공' : '실패 (' + r + ')';
}

// 예약 현황 시트의 "문자 결과" 칸에 발송 결과를 적어 둡니다. 실패해도 예약에는 영향이 없습니다.
function logSmsResult_(row, text) {
  try {
    var stamp = Utilities.formatDate(new Date(), TZ, 'MM-dd HH:mm');
    var cell = bookingSheet_().getRange(row, SMS_RESULT_COL);
    var before = String(cell.getValue() || '').trim();
    var line = stamp + ' ' + text;
    // 이전 기록 뒤에 이어 붙입니다 (접수 → 확정/거절 → 다시 보내기 순서로 쌓임)
    cell.setValue((before ? before + '\n' : '') + line);
  } catch (err) {
    Logger.log('문자 결과 기록 실패: ' + err);
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
// 사이트 상담 예약 (중복 방지 + 학원 확정/거절)
//
// 홈페이지의 예약 화면이 이 웹 앱에 요청을 보냅니다.
//   - 신청이 들어오면 상태 "대기"로 저장되고, 같은 날짜·시간은 다른 사람이 못 고릅니다.
//   - 학원 담당자에게 문자가 가며, 문자 속 링크에서 [확정] 또는 [거절]을 누릅니다.
//       확정 → 신청자에게 확정 문자 / 거절 → 신청자에게 거절 문자 + 그 시간이 다시 열림
//   - 예약 현황 시트의 "상태" 칸(대기/확정/거절/취소)을 직접 바꿔도 같은 문자가 나갑니다.
//   - 예약 가능한 시간·휴무일·예약 기간은 같은 시트의 [설정] 탭에서 학원이 직접 고칩니다.
//
// 처음 한 번: setupBooking() 실행 → 배포 → 새 배포 → 웹 앱
//   (실행 사용자: 나 / 액세스 권한: 모든 사용자) → 웹 앱 URL을 홈페이지에 연결
// 코드를 고친 뒤에는 setupBooking()을 다시 실행하고, 배포 → 배포 관리 → 새 버전으로 업데이트하세요.
// ═══════════════════════════════════════════════════════════════════
var TZ = 'Asia/Seoul';
// ※ 아래 네 값은 "처음 설정 시트를 만들 때의 기본값"입니다.
//   운영 중에는 예약 현황 시트의 [설정] 탭에서 고치면 바로 홈페이지에 반영됩니다. (코드를 고칠 필요 없음)
var TIME_SLOTS = ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']; // 예약 가능한 시간
var BOOKING_DAYS = 30;        // 오늘부터 며칠 뒤까지 예약을 받을지
var CLOSED_WEEKDAYS = [];     // 예약을 받지 않는 요일 (0=일, 1=월 … 6=토). 예: [0] 이면 일요일 휴무
var MAX_ACTIVE_PER_PHONE = 2; // 같은 번호로 동시에 가질 수 있는 예약 수 (대기·확정 합산)
var SETTINGS_SHEET = '설정';
var WEEKDAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];
var SETTINGS_WEEKDAY_ROW = 8; // 설정 탭에서 요일별 설정이 시작되는 줄 (일요일부터 7줄)
var BOOKING_HEADERS = ['접수시각', '예약일자', '예약시간', '이름', '전화번호', '최종학력',
                       '희망전공', '희망대학', '알게된 경로', '상담유형', '추가 문의사항', '상태', '확인 ID', '문자 결과'];
var STATUS_COL = 12;          // 시트에서 "상태"가 있는 열 (L)
var SMS_RESULT_COL = 14;      // 문자 발송 결과를 적는 열 (N)
var STATUS_PENDING = '대기';
var STATUS_OK = '확정';
var STATUS_NO = '거절';
var STATUS_CANCEL = '취소';

// 거절·취소된 시간은 다시 예약할 수 있습니다.
function isFreeStatus_(s) { return s === STATUS_NO || s === STATUS_CANCEL; }
// 학원이 아직 확인하지 않은 상태 ('접수'는 예전 이름)
function isPending_(s) { return s === STATUS_PENDING || s === '접수'; }

// ── 설정 탭: 학원에서 시트에서 직접 고치는 값들 ─────────────────────────
function pad2_(n) { return (n < 10 ? '0' : '') + n; }

// "15:00, 16:30 17시 18" 같은 글을 ['15:00','16:30','17:00','18:00']로 바꿉니다. (잘못된 글자는 무시)
function parseTimes_(text) {
  var out = [];
  String(text == null ? '' : text).split(/[,\s、，;]+/).forEach(function (tok) {
    var m = String(tok).trim().match(/^(\d{1,2})(?:[:시](\d{1,2}))?/);
    if (!m) return;
    var h = Number(m[1]), mi = m[2] ? Number(m[2]) : 0;
    if (h > 23 || mi > 59) return;
    var t = pad2_(h) + ':' + pad2_(mi);
    if (out.indexOf(t) === -1) out.push(t);
  });
  return out.sort();
}

// "2026-12-25, 2027.1.1" 같은 글을 ['2026-12-25','2027-01-01']로 바꿉니다.
function parseDates_(text) {
  var out = [];
  var re = /(\d{4})\D+(\d{1,2})\D+(\d{1,2})/g, m;
  var src = String(text == null ? '' : text);
  while ((m = re.exec(src)) !== null) {
    var d = m[1] + '-' + pad2_(Number(m[2])) + '-' + pad2_(Number(m[3]));
    if (out.indexOf(d) === -1) out.push(d);
  }
  return out.sort();
}

function settingsSheet_() {
  var id = PropertiesService.getScriptProperties().getProperty('BOOKING_SHEET_ID');
  return SpreadsheetApp.openById(id).getSheetByName(SETTINGS_SHEET);
}

// 설정 탭의 값을 읽습니다. 비었거나 잘못 적혀 있으면 기본값을 씁니다.
function getSettings_() {
  var st = {
    slots: TIME_SLOTS.slice(),
    days: BOOKING_DAYS,
    maxPerPhone: MAX_ACTIVE_PER_PHONE,
    closedDates: [],
    closedWeekdays: CLOSED_WEEKDAYS.slice(),
    slotsByWeekday: {},
  };
  try {
    var sh = settingsSheet_();
    if (!sh) return fillWeekdaySlots_(st);
    var v = sh.getRange(2, 2, 4, 1).getValues(); // B2:B5
    var times = parseTimes_(cellText_(v[0][0], 'HH:mm'));
    if (times.length) st.slots = times;
    var days = Number(cellText_(v[1][0]));
    if (days >= 1 && days <= 365) st.days = Math.floor(days);
    var mx = Number(cellText_(v[2][0]));
    if (mx >= 1 && mx <= 20) st.maxPerPhone = Math.floor(mx);
    st.closedDates = parseDates_(cellText_(v[3][0], 'yyyy-MM-dd'));

    var w = sh.getRange(SETTINGS_WEEKDAY_ROW, 1, 7, 3).getValues(); // 일~토
    st.closedWeekdays = [];
    for (var i = 0; i < 7; i++) {
      if (cellText_(w[i][1]) === '휴무') st.closedWeekdays.push(i);
      var own = parseTimes_(cellText_(w[i][2], 'HH:mm'));
      if (own.length) st.slotsByWeekday[i] = own;
    }
  } catch (err) {
    Logger.log('설정 읽기 오류(기본값 사용): ' + err);
  }
  return fillWeekdaySlots_(st);
}

// 요일별 시간이 비어 있으면 기본 시간을 채웁니다.
function fillWeekdaySlots_(st) {
  for (var i = 0; i < 7; i++) {
    if (!st.slotsByWeekday[i]) st.slotsByWeekday[i] = st.slots;
  }
  return st;
}

// 그 날짜에 예약할 수 있는 시간 목록 (휴무일이면 빈 목록)
function slotsFor_(st, dateStr) {
  if (st.closedDates.indexOf(dateStr) !== -1) return [];
  var wd = weekdayOf_(dateStr);
  if (st.closedWeekdays.indexOf(wd) !== -1) return [];
  return st.slotsByWeekday[wd] || st.slots;
}

// 설정 탭이 없으면 기본값으로 만듭니다. (이미 있으면 학원이 적어 둔 값을 그대로 둡니다)
function ensureSettingsSheet_(ss) {
  var cfg = ss.getSheetByName(SETTINGS_SHEET);
  if (cfg) return cfg;
  cfg = ss.insertSheet(SETTINGS_SHEET);
  cfg.getRange(1, 1, 14, 3).setNumberFormat('@');
  var rows = [
    ['항목', '값', '설명'],
    ['예약 가능 시간', TIME_SLOTS.join(', '), '쉼표로 구분해서 적으세요. 예: 15:00, 15:30, 16:00 (30분 단위도 가능)'],
    ['예약 가능 기간(일)', String(BOOKING_DAYS), '오늘부터 며칠 뒤까지 예약을 받을지 (숫자)'],
    ['같은 번호 동시 예약 수', String(MAX_ACTIVE_PER_PHONE), '한 전화번호로 동시에 가질 수 있는 예약 수 (숫자)'],
    ['휴무 날짜', '', '예약을 받지 않을 날짜. 쉼표로 구분. 예: 2026-12-25, 2027-01-01'],
    ['', '', ''],
    ['요일별 설정', '예약 여부', '시간 (비워 두면 위의 "예약 가능 시간"을 씁니다. 예: 13:00, 14:00, 15:00)'],
  ];
  cfg.getRange(1, 1, rows.length, 3).setValues(rows);
  var wk = [];
  for (var i = 0; i < 7; i++) wk.push([WEEKDAY_NAMES[i] + '요일', CLOSED_WEEKDAYS.indexOf(i) !== -1 ? '휴무' : '예약 받음', '']);
  cfg.getRange(SETTINGS_WEEKDAY_ROW, 1, 7, 3).setValues(wk);
  cfg.getRange(SETTINGS_WEEKDAY_ROW, 2, 7, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(['예약 받음', '휴무'], true).setAllowInvalid(false).build()
  );
  cfg.getRange(1, 1, 1, 3).setFontWeight('bold');
  cfg.getRange(7, 1, 1, 3).setFontWeight('bold');
  cfg.setColumnWidth(1, 170); cfg.setColumnWidth(2, 330); cfg.setColumnWidth(3, 520);
  return cfg;
}

// 예약 시트를 만들고 설정합니다. 처음 한 번 실행하고, 코드를 고친 뒤에도 다시 실행해도 안전합니다.
function setupBooking() {
  var props = PropertiesService.getScriptProperties();
  var ss, sh;
  var id = props.getProperty('BOOKING_SHEET_ID');
  if (id) {
    ss = SpreadsheetApp.openById(id);
    sh = ss.getSheetByName('예약');
  } else {
    ss = SpreadsheetApp.create('올댓아트 상담 예약 현황');
    sh = ss.getSheets()[0];
    sh.setName('예약');
    props.setProperty('BOOKING_SHEET_ID', ss.getId());
  }
  sh.getRange(1, 1, sh.getMaxRows(), BOOKING_HEADERS.length).setNumberFormat('@'); // 날짜·번호가 변형되지 않게 글자로 저장
  sh.getRange(1, 1, 1, BOOKING_HEADERS.length).setValues([BOOKING_HEADERS]).setFontWeight('bold');
  sh.setFrozenRows(1);
  sh.getRange(2, STATUS_COL, Math.max(sh.getMaxRows() - 1, 1), 1).setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList([STATUS_PENDING, STATUS_OK, STATUS_NO, STATUS_CANCEL], true)
      .setAllowInvalid(false).build()
  );

  ensureSettingsSheet_(ss); // [설정] 탭 (시간·휴무일 등을 학원에서 직접 고치는 곳)

  // 이미 숫자로 바뀌어 저장된 번호(앞의 0이 지워진 것)를 복구합니다.
  var lastRow = sh.getLastRow();
  if (lastRow >= 2) {
    var phoneRange = sh.getRange(2, 5, lastRow - 1, 1);
    var fixed = phoneRange.getValues().map(function (r) {
      return [normalizePhone_(r[0]) || String(r[0] == null ? '' : r[0])];
    });
    phoneRange.setNumberFormat('@');
    phoneRange.setValues(fixed);
  }

  // 시트의 "상태" 칸을 직접 바꿨을 때 신청자에게 문자가 가도록 연결 (한 번만 만듭니다)
  var hasTrigger = ScriptApp.getProjectTriggers().some(function (t) {
    return t.getHandlerFunction() === 'onBookingEdit';
  });
  if (!hasTrigger) ScriptApp.newTrigger('onBookingEdit').forSpreadsheet(ss).onEdit().create();

  Logger.log('예약 현황 시트: ' + ss.getUrl());
  Logger.log('이제 배포 → 새 배포(또는 배포 관리 → 새 버전) → 웹 앱으로 배포하세요.');
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
  if (v instanceof Date) return Utilities.formatDate(v, TZ, fmt || 'yyyy-MM-dd');
  return String(v == null ? '' : v).trim();
}

// 시트의 모든 예약을 읽습니다. (row = 시트의 줄 번호)
function readRows_() {
  var sh = bookingSheet_();
  var last = sh.getLastRow();
  if (last < 2) return [];
  return sh.getRange(2, 1, last - 1, BOOKING_HEADERS.length).getValues()
    .map(function (r, i) {
      return {
        row: i + 2,
        date: cellText_(r[1], 'yyyy-MM-dd'),
        time: cellText_(r[2], 'HH:mm'),
        name: cellText_(r[3]),
        phone: normalizePhone_(r[4]),
        edu: cellText_(r[5]),
        major: cellText_(r[6]) || '-',
        univ: cellText_(r[7]),
        route: cellText_(r[8]),
        type: cellText_(r[9]) || '-',
        memo: cellText_(r[10]) || '-',
        status: cellText_(r[11]),
        id: cellText_(r[12]),
      };
    })
    .filter(function (b) { return b.date && b.time; });
}

// 거절·취소되지 않은 예약 (= 시간을 차지하고 있는 예약)
function activeBookings_() {
  return readRows_().filter(function (b) { return !isFreeStatus_(b.status); });
}

function findById_(id) {
  if (!/^[A-Za-z0-9]{16,64}$/.test(String(id || ''))) return null;
  var rows = readRows_();
  for (var i = 0; i < rows.length; i++) if (rows[i].id === id) return rows[i];
  return null;
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action === 'review') return reviewPage_(p.id);
  try {
    var today = todayStr_();
    var booked = {};
    activeBookings_().forEach(function (b) {
      if (b.date >= today) (booked[b.date] = booked[b.date] || []).push(b.time);
    });
    var st = getSettings_();
    return json_({
      ok: true,
      today: today,
      now: Utilities.formatDate(new Date(), TZ, 'HH:mm'),
      days: st.days,
      slots: st.slots,
      slotsByWeekday: st.slotsByWeekday,
      closedWeekdays: st.closedWeekdays,
      closedDates: st.closedDates,
      booked: booked,
    });
  } catch (err) {
    Logger.log('doGet 오류: ' + err);
    return json_({ ok: false, error: 'server' });
  }
}

function esc_(v) {
  return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// 담당자가 문자 속 링크를 열면 보이는 확인 화면 (확정 / 거절 버튼)
function reviewPage_(id) {
  var b = findById_(id);
  var body;
  if (!b) {
    body = '<p>찾을 수 없는 요청입니다.</p>';
  } else {
    var rows = [
      ['예약 일시', b.date + ' ' + b.time], ['이름', b.name], ['연락처', b.phone],
      ['상담 유형', b.type], ['최종학력', b.edu], ['알게된 경로', b.route || '-'], ['희망 전공', b.major],
      ['희망 대학', b.univ || '-'], ['문의', b.memo],
    ];
    body = '<h2>상담 신청 확인</h2><table>' + rows.map(function (r) {
      return '<tr><th>' + esc_(r[0]) + '</th><td>' + esc_(r[1]) + '</td></tr>';
    }).join('') + '</table>';
    if (isPending_(b.status)) {
      body += '<div id="act"><button class="ok" onclick="go(\'ok\')">확정하기</button>' +
        '<button class="no" onclick="go(\'no\')">거절하기</button></div>' +
        '<p id="msg" class="msg"></p>' +
        '<script>function go(d){var bs=document.querySelectorAll("button");' +
        'for(var i=0;i<bs.length;i++)bs[i].disabled=true;' +
        'google.script.run.withSuccessHandler(function(m){document.getElementById("msg").textContent=m;' +
        'document.getElementById("act").style.display="none";})' +
        '.withFailureHandler(function(e){document.getElementById("msg").textContent="오류: "+e.message;' +
        'for(var i=0;i<bs.length;i++)bs[i].disabled=false;})' +
        '.decideBooking(' + JSON.stringify(b.id) + ',d);}</script>';
    } else {
      body += '<p class="msg">이미 처리된 요청입니다. (현재 상태: <b>' + esc_(b.status) + '</b>)</p>';
      if (b.status === STATUS_OK || b.status === STATUS_NO) {
        body += '<div id="act"><button class="ok" style="width:100%" onclick="again()">' +
          (b.status === STATUS_OK ? '확정' : '거절') + ' 문자 다시 보내기</button></div><p id="msg" class="msg"></p>' +
          '<script>function again(){var bs=document.querySelectorAll("button");' +
          'for(var i=0;i<bs.length;i++)bs[i].disabled=true;' +
          'google.script.run.withSuccessHandler(function(m){document.getElementById("msg").textContent=m;' +
          'for(var i=0;i<bs.length;i++)bs[i].disabled=false;})' +
          '.withFailureHandler(function(e){document.getElementById("msg").textContent="오류: "+e.message;' +
          'for(var i=0;i<bs.length;i++)bs[i].disabled=false;})' +
          '.resendDecision(' + JSON.stringify(b.id) + ');}</script>';
      }
    }
  }
  var html = '<!doctype html><html><head><meta charset="utf-8"><style>' +
    'body{font-family:sans-serif;max-width:480px;margin:0 auto;padding:20px;color:#111}' +
    'table{width:100%;border-collapse:collapse;margin:12px 0}th,td{padding:8px;border-bottom:1px solid #ddd;text-align:left;font-size:15px}' +
    'th{width:92px;color:#666;font-weight:500}button{width:48%;padding:14px;font-size:16px;border:0;border-radius:8px;color:#fff}' +
    '.ok{background:#f37520}.no{background:#555;float:right}.msg{margin-top:16px;font-size:16px}#act{overflow:hidden;margin-top:16px}' +
    '</style></head><body>' + body + '</body></html>';
  return HtmlService.createHtmlOutput(html).setTitle('상담 신청 확인')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// 확인 화면의 버튼이 호출합니다. decision: 'ok'(확정) 또는 'no'(거절)
function decideBooking(id, decision) {
  if (decision !== 'ok' && decision !== 'no') return '잘못된 요청입니다.';
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  var b, status;
  try {
    b = findById_(id);
    if (!b) return '찾을 수 없는 요청입니다.';
    if (!isPending_(b.status)) return '이미 처리된 요청입니다. (현재 상태: ' + b.status + ')';
    status = decision === 'ok' ? STATUS_OK : STATUS_NO;
    bookingSheet_().getRange(b.row, STATUS_COL).setValue(status);
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
  var r = notifyDecision_(b, status);
  var head = status === STATUS_OK ? '확정했습니다.' : '거절했습니다. (그 시간은 다시 열렸어요)';
  if (r === 'OK') {
    return head + ' 신청자에게 ' + (status === STATUS_OK ? '확정' : '안내') + ' 문자를 보냈어요.';
  }
  return head + ' 하지만 신청자에게 문자를 보내지 못했어요. 사유: ' + r +
    ' — 신청자(' + b.phone + ')에게 직접 연락해 주세요. 원인을 해결한 뒤 이 링크에서 문자를 다시 보낼 수 있어요.';
}

// 이미 확정/거절한 신청의 결과 문자를 다시 보냅니다. (확인 화면의 [문자 다시 보내기] 버튼)
function resendDecision(id) {
  var b = findById_(id);
  if (!b) return '찾을 수 없는 요청입니다.';
  var status = b.status;
  if (status !== STATUS_OK && status !== STATUS_NO) return '확정 또는 거절한 요청만 다시 보낼 수 있어요. (현재 상태: ' + b.status + ')';
  var r = notifyDecision_(b, status);
  return r === 'OK' ? '문자를 다시 보냈어요.' : '문자를 보내지 못했어요. 사유: ' + r;
}

// 확정/거절 결과를 신청자에게 문자로 알립니다.
// 돌려주는 값: 'OK' 이거나 실패 이유 글. 결과는 시트의 "문자 결과" 칸에도 적습니다.
function notifyDecision_(b, status) {
  if (status !== STATUS_OK && status !== STATUS_NO) return 'skip';
  var msg = status === STATUS_OK ? buildConfirmMessage_(b) : buildRejectMessage_(b);
  var title = ACADEMY_NAME + (status === STATUS_OK ? ' 상담 확정' : ' 상담 안내');
  var r = phoneOrEmpty_(b.phone) ? sendSms_(b.phone, msg, title) : '번호 오류: ' + b.phone;
  if (r !== 'OK') notifyFailure_(b, [r]);
  logSmsResult_(b.row, (status === STATUS_OK ? '확정' : '거절') + ' 문자 ' + smsText_(r));
  return r;
}

function phoneOrEmpty_(p) { return normalizePhone_(p); }

// 시트의 "상태" 칸을 직접 바꿨을 때 실행됩니다 (setupBooking이 연결해 둠).
function onBookingEdit(e) {
  try {
    var r = e.range;
    if (r.getSheet().getName() !== '예약' || r.getColumn() !== STATUS_COL ||
        r.getNumRows() !== 1 || r.getRow() < 2) return;
    var now = String(e.value || '').trim();
    var old = String(e.oldValue || '').trim();
    if (now === old || (now !== STATUS_OK && now !== STATUS_NO)) return;
    var rows = readRows_().filter(function (x) { return x.row === r.getRow(); });
    if (rows.length) notifyDecision_(rows[0], now);
  } catch (err) {
    Logger.log('onBookingEdit 오류: ' + err);
  }
}

function clean_(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max);
}

// 접수 내용을 검사해 정리합니다. 문제가 있으면 { error: '코드' }
function cleanBooking_(d, st) {
  st = st || getSettings_();
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
  if (f.date < today || f.date > addDaysStr_(today, st.days)) return { error: 'invalid_date' };
  var daySlots = slotsFor_(st, f.date);
  if (!daySlots.length) return { error: 'invalid_date' }; // 휴무일
  if (daySlots.indexOf(f.time) === -1) return { error: 'invalid_time' };
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
    var st = getSettings_();
    var f = cleanBooking_(d, st);
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
    if (mine >= st.maxPerPhone) return json_({ ok: false, error: 'too_many' });

    var bookingId = Utilities.getUuid().replace(/-/g, '');
    var sh = bookingSheet_();
    var newRow = sh.getLastRow() + 1;
    var rowRange = sh.getRange(newRow, 1, 1, BOOKING_HEADERS.length);
    rowRange.setNumberFormat('@'); // 먼저 글자 형식으로 지정해야 번호 앞의 0이 지워지지 않습니다
    rowRange.setValues([[
      Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss'),
      f.date, f.time, f.name, f.phone, f.edu, f.major, f.univ, f.route, f.type, f.memo,
      STATUS_PENDING, bookingId, '',
    ]]);
    SpreadsheetApp.flush();
    lock.releaseLock();
    locked = false;

    // 접수가 끝난 뒤 문자 발송 (문자가 실패해도 접수는 유지)
    var base = '';
    try { base = ScriptApp.getService().getUrl(); } catch (err) { base = ''; }
    var sent = notifyBooking_({
      name: f.name, phone: f.phone, date: f.date, time: f.time,
      type: f.type || '-', major: f.major || '-', memo: f.memo || '-', route: f.route,
      reviewUrl: base ? base + '?action=review&id=' + bookingId : '',
    });
    logSmsResult_(newRow, '접수 문자: 신청자 ' + smsText_(sent[0]) + ' / 담당자 ' + smsText_(sent[1]));
    return json_({ ok: true });
  } catch (err) {
    Logger.log('doPost 오류: ' + err);
    return json_({ ok: false, error: 'server' });
  } finally {
    if (locked) lock.releaseLock();
  }
}

// ── 솔라피 잔액 확인: 문자가 안 갈 때 먼저 실행해 보세요 ────────────────
// 실행 로그에 남은 잔액(원)이 나옵니다. 문자 1통(장문)은 약 45원입니다.
function checkSolapiBalance() {
  var p = PropertiesService.getScriptProperties();
  var apiKey = p.getProperty('SOLAPI_API_KEY');
  var apiSecret = p.getProperty('SOLAPI_API_SECRET');
  var date = new Date().toISOString();
  var salt = Utilities.getUuid().replace(/-/g, '');
  var signature = Utilities.computeHmacSha256Signature(date + salt, apiSecret).map(function (b) {
    return ('0' + (b & 0xff).toString(16)).slice(-2);
  }).join('');
  var res = UrlFetchApp.fetch('https://api.solapi.com/cash/v1/balance', {
    method: 'get',
    headers: { Authorization: 'HMAC-SHA256 apiKey=' + apiKey + ', date=' + date + ', salt=' + salt + ', signature=' + signature },
    muteHttpExceptions: true,
  });
  Logger.log('솔라피 응답(' + res.getResponseCode() + '): ' + res.getContentText());
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
    route: pick_(named, '알게된 경로'),
    memo: pick_(named, '추가 문의') || '-',
  };
}

// 010-1234-5678, +82 10 1234 5678 → 01012345678 (휴대폰 형식이 아니면 빈 값)
function normalizePhone_(raw) {
  var d = String(raw == null ? '' : raw).replace(/[^0-9]/g, '');
  if (d.indexOf('82') === 0) d = '0' + d.substring(2);
  // 시트가 번호를 숫자로 바꾸면서 맨 앞의 0이 사라진 경우(1055556666)를 복구합니다.
  if (/^1[016789][0-9]{7,8}$/.test(d)) d = '0' + d;
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
