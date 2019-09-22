/* 
парсит и выдает в виде текстового файла даты по имменам здаданным в пременной names

запускается в браузере на странице https://svyatsy.org/imeniny/ на странице должен быть jquery
*/

const broGetMonth = function(str) {
  let ar = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  for (let i = 0; i < ar.length; i++) {
    let m = ar[i];
    if (str.indexOf(m) != -1) {
      return String(i + 1).padStart(2, "0");
    }
  }
};
let names = [
  "николай",
  "петр",
  "матрона",
  "феврония",
  "александр",
  "александра",
  "иоанн",
  "иоанна",
  "спиридон",
  "михаил",
  "михаила",
  "георгий",
  "мария",
  "андрей",
  "ксения",
  "сергий",
  "софия",
  "анна",
  "лавр",
  "серафим",
  "серафима",
  "елена",
  "лука",
  "владимир",
  "никита",
  "анастасия",
  "артемий",
  "виктория",
  "ирина",
  "максим",
  "кирилл",
  "ника",
  "надежда",
  "вера",
  "иулиания",
  "ольга",
  "даниил",
  "гавриил",
  "виктор",
  "марк",
  "наталий",
  "мелания",
  "екатерина",
  "роман",
  "любовь",
  "лев",
  "вероника",
  "варвара",
  "феодор",
  "константин",
  "павел",
  "ангелина",
  "дионисий",
  "арсений",
  "стефан",
  "василий",
  "трифон",
  "вадим",
  "давид",
  "мирон",
  "ева",
  "евгений",
  "евгения",
  "макарий",
  "христофор",
  "аполлинарий",
  "нина",
  "таисия",
  "тимофей",
  "лариса",
  "маргарита",
  "матфей",
  "платон",
  "валерий",
  "валерия",
  "лидия",
  "вячеслав",
  "игорь",
  "фотиния",
  "злата",
  "кира",
  "григорий",
  "диомид",
  "симеон",
  "валентин",
  "валентина",
  "галина",
  "елисавета",
  "агния",
  "елисей",
  "митрофан",
  "марина",
  "борис",
  "емилия",
  "ярослав",
  "антоний",
  "нектарий",
  "алексий",
  "герман",
  "олег",
  "тихон",
  "артема",
  "марфа",
  "анатолий",
  "анатолия",
  "димитрий",
  "савва",
];

let namesrez = {};
names.forEach(name => (namesrez[name] = []));
(async () => {
  let log = "";
  try {
    for (let name in namesrez) {
      let allA = $(".alphabetical-index--names a");
      let href = allA
        .filter(function() {
          return (
            $(this)
              .text()
              .toLowerCase() === name.toLowerCase()
          );
        })
        .eq(0)
        .attr("href");
      let html = await $.ajax(href);
      let dates = $(".calendar-month__row", html);
      dates.each((i, date) => {
        let dateOut = $(date)
          .find(".calendar-month__date")
          .text();
        let m = broGetMonth(dateOut);
        let d = dateOut[0] + dateOut[1];
        let nameOut = $(date)
          .find(".calendar-month__text")
          .text();
        dateOut = `${m}/${d}/20`;
        namesrez[name].push([dateOut, nameOut]);
        log += `${name}\t${dateOut}\t${nameOut}\thttps://svyatsy.org${href}\n`;
      });
    }
  } catch (er) {
    console.dir(er);
  } finally {
    var textDoc = document.createElement("a");
    textDoc.target = "_blank";
    textDoc.download = "myFile.txt";
    textDoc.href = "data:attachment/text," + encodeURI(log);
    textDoc.click();
  }
})();
