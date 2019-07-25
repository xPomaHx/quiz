<template>
  <v-app>
    <div class="quiz-container">
      <div>
        <v-btn
          outline
          color="indigo"
          @click="prev"
          :disabled="prevIsDisabled"
          class="bro-btn-back"
        >Назад</v-btn>
      </div>
      <div class="quiz-step-container">
        <div class="step1" v-show="currentStep===1">
          <p>У каждого из нас есть свои небесные помощники, которые помогают нам в наших трудностях и направляют в моменты сомнений.</p>
          <p>
            Все люди разные и каждому из нас дан свой небесный покровитель, помогающий именно ему, который опекает, заботится и оберегает. Он дан
            свыше, чтобы защищать охранять и помогать. Наши просьбы и молитвы лучше и быстрее всего слышат и исполняют именно они.
          </p>
          <p>
            <strong>Именно поэтому очень важно знать, кто является Вашим небесным покровителем. Мы можем помочь Вам узнать вашего небесного покровителя:</strong>
          </p>
          <v-btn
            outline
            color="indigo"
            @click="next"
            class="bro-btn-next"
            :disabled="nextIsDisabled"
          >Хочу узнать кто мой небесный покровитель</v-btn>
          <small>* Нажимая на кнопку, вы соглашаетесь на обработку персональных данных</small>
        </div>
        <div class="step2" v-show="currentStep===2">
          <p>
            <strong>Для кого вы хотите узнать небесного покровителя?</strong>
          </p>
          <v-radio-group v-model="dlyakogo">
            <v-radio label="Для Себя" value="1"></v-radio>
            <v-radio label="Для другого человека (Не для себя)" value="0"></v-radio>
          </v-radio-group>
          <v-btn
            outline
            color="indigo"
            @click="next"
            class="bro-btn-next"
            :disabled="nextIsDisabled"
          >Далее</v-btn>
        </div>
        <div class="step3" v-show="currentStep===3">
          <p>
            <strong>Ваш святой небесный покровитель носит ваше имя. Чтобы его определить, скажите, как вас зовут?</strong>
          </p>
          <v-autocomplete
            v-model="name"
            :items="namesAutoComplite(namesearch)"
            :search-input.sync="namesearch"
            hide-no-data
            :label="`Введите имя`"
            :placeholder="`Введите имя`"
          ></v-autocomplete>
          <v-btn
            outline
            color="indigo"
            @click="next"
            class="bro-btn-next"
            :disabled="nextIsDisabled"
          >Далее</v-btn>
        </div>
        <div class="step4" v-show="currentStep===4">
          <p>
            <strong>Вас крестили?</strong>
          </p>
          <v-radio-group v-model="vaskrestili">
            <v-radio label="Да" value="1"></v-radio>
            <v-radio label="Нет" value="0"></v-radio>
          </v-radio-group>
          <v-btn
            outline
            color="indigo"
            @click="next"
            class="bro-btn-next"
            :disabled="nextIsDisabled"
          >Далее</v-btn>
        </div>
        <div class="step5" v-show="currentStep===5">
          <p>
            <strong>Вы помните когда вас крестили?</strong>
          </p>
          <p
            style="text-align: left;
    align-self: flex-start;
    margin-bottom:-0px;
    margin-left: 94px;"
          >Выберите дату</p>
          <div class="bro-row">
            <v-select
              v-model="datekrest1"
              :items="(new Array(31)).fill(0).map((_,i)=>i+1)"
              placeholder="--"
              :disabled="vaskrestilipomny"
            ></v-select>
            <v-select
              v-model="datekrest2"
              :items="['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Ноябрь','Декабрь'].map((el,i)=>({text:el,value:i+1}))"
              placeholder="--"
              :disabled="vaskrestilipomny"
            ></v-select>
            <v-select
              v-model="datekrest3"
              placeholder="----"
              :disabled="vaskrestilipomny"
              :items="(new Array(90)).fill(0).map((_,i)=>i+(2019-90))"
            ></v-select>
          </div>
          <v-checkbox v-model="vaskrestilipomny" label="Не помню"></v-checkbox>
          <v-btn
            outline
            color="indigo"
            @click="next"
            class="bro-btn-next"
            :disabled="nextIsDisabled"
          >Далее</v-btn>
        </div>
        <div class="step6" v-show="currentStep===6">
          <p>
            <strong>Какое имя дали вам при крещении?</strong>
            <br />Введите если имя отличается от мирского
          </p>
          <v-checkbox v-model="imyaprikresh" :label="name" @change="name2=null"></v-checkbox>
          <v-autocomplete
            v-model="name2"
            :items="namesAutoComplite(name2search)"
            :search-input.sync="name2search"
            hide-no-data
            :label="`Введите имя`"
            placeholder="Введите имя"
            @change="imyaprikresh=null"
            persistent-hint
          ></v-autocomplete>
          <v-btn
            outline
            color="indigo"
            @click="next"
            class="bro-btn-next"
            :disabled="nextIsDisabled"
          >Далее</v-btn>
        </div>
        <div class="step7" v-show="currentStep===7">
          <p>
            <strong>День вашего появления на свет имеет важное значение, от этого зависит кто ваш небесный покровитель. Введите ваш день рождения.</strong>
          </p>
          <p
            style="text-align: left;
    align-self: flex-start;
    margin-bottom:-0px;
    margin-left: 94px;"
          >Выберите дату</p>
          <div class="bro-row">
            <v-select
              v-model="datebeth1"
              :items="(new Array(31)).fill(0).map((_,i)=>i+1)"
              placeholder="--"
            ></v-select>
            <v-select
              v-model="datebeth2"
              :items="['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Ноябрь','Декабрь'].map((el,i)=>({text:el,value:i+1}))"
              placeholder="--"
            ></v-select>
            <v-select
              v-model="datebeth3"
              placeholder="----"
              :items="(new Array(90)).fill(0).map((_,i)=>i+(2019-90))"
            ></v-select>
          </div>
          <v-btn
            outline
            color="indigo"
            @click="next"
            class="bro-btn-next"
            :disabled="nextIsDisabled"
          >Далее</v-btn>
        </div>

        <div class="step8" v-show="currentStep===8">
          <p>
            <strong>Поздравить вас с вашими именинами – днем памяти вашего небесного покровителя – большая радость для нас. Если хотите чтобы мы это сделали, пожалуйста, оставьте вашу почту</strong>
          </p>
          <v-text-field v-model="email" label="Ваш e-mail" placeholder="Например name@name.ru"></v-text-field>
          <v-btn
            outline
            color="indigo"
            @click="next"
            class="bro-btn-next"
            :disabled="nextIsDisabled"
          >Далее</v-btn>
        </div>
        <div class="step9" v-show="currentStep===9">
          <p>
            Ваш святой небесный покровитель –
            <br />
            <strong>{{curLineData.name}}</strong>
            <br />Информация про него
          </p>
          <div class="bro-row">
            <div class="bro-col" v-for="(good,index) in goods" :key="index">
              <div
                class="bro-img"
                @click="next(good)"
                :style="{'background-image': 'url(https://shop.svyatsy.org/'+good.imgSrc+')'}"
              ></div>
              <div class="bro-vnalichii">В наличии</div>
              <h4 @click="next(good)">{{good.title}}</h4>
              <div class="bro-price">
                <small>{{good.price1}}</small>
                <span>{{good.price2}}</span>
              </div>
              <v-btn
                outline
                color="green"
                @click="next(good)"
                class="bro-btn-next"
                :disabled="nextIsDisabled"
              >Подробнее</v-btn>
            </div>
          </div>
          <v-btn
            outline
            color="indigo"
            @click="next"
            class="bro-btn-next"
            :disabled="nextIsDisabled"
          >Посмотреть все с {{curLineData.name}}</v-btn>
        </div>
        <div class="step10" v-show="currentStep===10">
          <p>
            <strong>Крещение – важное событие с жизни человека. Таинство крещения проводятся в Церкви и для участия в нем надо обратиться в Храм. Так же, для осуществления таинства крещения, следует приобрести крестильную рубашку, крестик и рушник</strong>
          </p>
          <v-btn
            outline
            color="indigo"
            @click="next"
            class="bro-btn-next"
            :disabled="nextIsDisabled"
          >Купить всё необходимое для таинства крещения</v-btn>
        </div>
      </div>
    </div>
  </v-app>
</template>


<script>
import { async } from "q";
function postData(url = "", data = {}) {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrer: "no-referrer", //
    body: JSON.stringify(data)
  });
}
function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export default {
  name: "App",
  components: {},
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,

      rules: {
        required: value => !!value || "Обязательно.",
        counter: value => value.length <= 20 || "Max 20 characters",
        email: value => {
          if (!value) return true;
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Некорректный e-mail.";
        }
      },
      namesXlsData: [],
      names: [],

      email: "",
      dlyakogo: "1",
      currentStep: 1,
      name: "",
      namesearch: "",
      vaskrestili: "1",
      vaskrestilipomny: false,
      datekrest1: null,
      datekrest2: null,
      datekrest3: null,
      datebeth1: null,
      datebeth2: null,
      datebeth3: null,
      imyaprikresh: true,
      name2: "",
      name2search: "",

      goods: [
        {
          title: "Крест серебряный, позолота 5113",
          link: "https://shop.svyatsy.org/",
          price1: "3 150 руб.",
          price2: "2 930 руб.",
          imgSrc:
            "https://svyatsy.org/assets/images/shop/dominoes/RAR-248m_enl.jpg"
        },
        {
          title: "Крест серебряный, позолота 5113",
          link: "https://shop.svyatsy.org/",
          price1: "3 150 руб.",
          price2: "2 930 руб.",
          imgSrc:
            "https://svyatsy.org/assets/images/shop/dominoes/RAR-248m_enl.jpg"
        },
        {
          title: "Крест серебряный, позолота 5113",
          link: "https://shop.svyatsy.org/",
          price1: "3 150 руб.",
          price2: "2 930 руб.",
          imgSrc:
            "https://svyatsy.org/assets/images/shop/dominoes/RAR-248m_enl.jpg"
        }
      ]
    };
  },
  watch: {
    menu1(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"), 1);
    },
    menu2(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"), 1);
    }
  },
  computed: {
    datekrest() {
      return this.datekrest1 + "-" + this.datekrest2 + "-" + this.datekrest3;
    },
    datebeth() {
      return this.datekrest1 + "-" + this.datekrest2 + "-" + this.datekrest3;
    },
    formData() {
      return [
        new Date().toISOString(),
        this.email,
        this.dlyakogo,
        this.currentStep,
        this.name,
        this.vaskrestili,
        this.vaskrestilipomny,
        this.datekrest,
        this.datebeth,
        this.imyaprikresh,
        this.name2
      ];
    },
    curLineData() {
      let ret = {
        name: "",
        link: ""
      };
      let name = this.name2 || this.name;
      let [y, m, d] = (this.datebeth || this.datekrest || "").split("-");
      let date = new Date(`2000-${m}-${d}`);
      let filtredData = this.namesXlsData.filter(el => el[0] == name);
      if (!filtredData.length || !name || !m || !d) {
        return ret;
      }
      filtredData.sort((a, b) => {
        if (a[1] > b[1]) {
          return 1;
        } else {
          return -1;
        }
      });
      let curEl = {};
      for (let i = 0; i < filtredData.length; i++) {
        curEl = filtredData[i];
        if (date < curEl[1]) {
          break;
        }
      }
      ret.name = curEl[2];
      ret.link = curEl[3];

      return ret;
    },
    nextIsDisabled() {
      switch (this.currentStep) {
        case 3:
          return !Boolean(this.name);
          break;
        case 4:
          return !Boolean(this.vaskrestili);
          break;
        case 5:
          return !Boolean(
            (this.datekrest1 && this.datekrest2 && this.datekrest3) ||
              this.vaskrestilipomny
          );
          break;
        case 6:
          return !Boolean(this.imyaprikresh || this.name2);
          break;
        case 7:
          return !Boolean(this.datebeth1 && this.datebeth2 && this.datebeth3);
          break;
        default:
          return false;
      }
    },
    prevIsDisabled() {
      return this.currentStep == 1;
    }
  },
  methods: {
    namesAutoComplite(val) {
      return val && val.length > 1 ? this.names : [];
    },
    next(e) {
      switch (this.currentStep) {
        case 4:
          if (this.vaskrestili == 1) {
            this.currentStep++;
          } else {
            this.currentStep = 10;
          }
          break;
        case 9:
        case 10:
          let nextUrl = this.curLineData.link;
          if (e && e.link) {
            nextUrl = e.link;
          }
          postData("./save.php", this.formData).then(function() {
            window.top.location.href = nextUrl;
          });
          break;
        default:
          this.currentStep++;
      }
    },
    prev() {
      switch (this.currentStep) {
        case 10:
          if (this.vaskrestili == 1) {
            this.currentStep--;
          } else {
            this.currentStep = 4;
          }
          break;
        default:
          this.currentStep--;
      }
    }
  },
  created() {
    var reader = new FileReader();
    reader.onload = e => {
      var data = e.target.result;
      var cfb = XLS.CFB.read(data, {
        type: "binary"
      });
      var wb = XLS.parse_xlscfb(cfb);
      wb.SheetNames.forEach(sheetName => {
        var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
        let tar = XLS.utils
          .sheet_to_json(wb.Sheets[sheetName], {
            header: 1
          })
          .slice(1);
        tar = tar.map(el => {
          el[0] = jsUcfirst(el[0]);
          let [m, d] = el[1].split("/");
          el[1] = new Date(`2000-${m}-${d}`);
          return el;
        });
        this.namesXlsData = tar;
        this.names = tar.map(el => el[0]);
      });
    };
    var request = new XMLHttpRequest();
    request.open("GET", "./names.xls", true);
    request.responseType = "blob";
    request.onload = function() {
      let oFile = request.response;
      reader.readAsBinaryString(oFile);
    };
    request.send();
    let that = this;
    (() => {
      let request = new XMLHttpRequest();
      request.open("GET", "./getGoods.php", true);
      request.onload = () => {
        let res = request.response;
        let { goods } = JSON.parse(res);
        goods = Object.values(
          goods.reduce((acc, next) => {
            if (!acc[next.id]) acc[next.id] = {};
            acc[next.id].title = next.pagetitle;
            if (next.tmplvarid == "32") {
              acc[next.id].imgSrc = next.value;
            }
            if (next.tmplvarid == "46") {
              acc[next.id].price1 = next.value;
            }
            if (next.tmplvarid == "35") {
              acc[next.id].price2 = next.value;
            }
            return acc;
          }, {})
        );
        that.$set(this, "goods", goods);
      };
      request.send();
    })();
  }
};
</script>

<style>
html,
body {
  /*display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;*/
}
html {
  overflow: hidden;
}
body {
  padding: 34px;
}
.theme--light.application {
  background-color: transparent;
}
.application--wrap {
  min-height: unset;
  align-items: center;
  justify-content: center;
}
.quiz-container {
  background-color: #fff;
  padding: 20px;
  padding-top: 45px;
  color: #374561;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 538px;
  height: 498px;
  box-sizing: border-box;
  border: 1px solid gold;
  border-image-slice: 34 34 34 34;
  border-image-width: 34px 34px 34px 34px;
  border-image-outset: 34px 34px 34px 34px;
  border-image-repeat: repeat repeat;
  border-image-source: url(./assets/border.png);
  box-shadow: 0px 40px 60px rgba(0, 0, 0, 0.05);
}
button.v-btn.bro-btn-back {
  position: absolute;
  top: 20px;
  left: 20px;
  font-family: Roboto Slab;
  font-size: 13px;
  line-height: 17px;
  text-align: center;
  padding: 4px 12px;
  text-decoration: unset;
  text-transform: none;
  border: 1px solid rgba(55, 69, 97, 0.1);
  color: #374561;
  border-radius: 4px;
  box-sizing: border-box;
  height: auto;
  min-width: unset;
  min-height: unset;
  border-color: rgba(55, 69, 97, 0.1);
}
button.v-btn.bro-btn-back:hover {
  position: absolute;
}
.quiz-step-container button.v-btn.v-btn--outline.bro-btn-next {
  margin-top: 20px;
  margin-bottom: 10px;
  background: #fbd690 !important;
  border: 0px solid #000;
  border-radius: 4px;
  padding: 25px 35px;
  min-width: 200px;
}

.quiz-step-container button.v-btn.v-btn--outline.bro-btn-next.v-btn--disabled {
  background: #d7dadf !important;
}
.quiz-step-container button.v-btn.v-btn--outline.bro-btn-next.green--text {
  background: #67bd8e !important;
}
.quiz-step-container
  button.v-btn.v-btn--outline.bro-btn-next.green--text
  .v-btn__content {
  color: white !important;
}

.quiz-step-container button.v-btn.v-btn--outline.bro-btn-next .v-btn__content {
  font-size: 15px;
  line-height: 0px;
  text-decoration: none;
  text-transform: none;
  color: #374561;
  font-weight: normal;
}
.quiz-step-container
  button.v-btn.v-btn--outline.bro-btn-next.v-btn--disabled
  .v-btn__content {
  color: white;
}
p {
  margin-bottom: 10px;
  text-align: center;
  font-size: 15px;
  font-family: Roboto Slab;
  line-height: 20px;
  margin-bottom: 20px;
}
p strong {
  font-size: 18px;
  font-weight: bold;
  font-family: Roboto Slab;
}
.theme--light.v-label {
  font-size: 16px;
  font-family: Roboto Slab;
  color: #374561;
  top: -5px;
}
.quiz-step-container > div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.step1 small {
  font-size: 13px;
  line-height: 17px;
  color: rgba(55, 69, 97, 0.5);
}
.indigo--text {
  color: #374561 !important;
  caret-color: #374561 !important;
}
.v-radio .accent--text,
.v-input .accent--text {
  color: #67bd8e !important;
  caret-color: #67bd8e !important;
}
.v-input {
  margin-top: 20px;
}
.v-select__slot,
.v-text-field__slot {
  padding-left: 10px;
  border: 1px solid #d7dadf;
  box-sizing: border-box;
  border-radius: 4px;
}
.v-text-field__slot {
  min-width: 300px;
}
.v-text-field > .v-input__control > .v-input__slot:before,
.v-text-field > .v-input__control > .v-input__slot:after {
  display: none;
}
.v-text-field input {
  padding-top: 10px;
  padding-bottom: 10px;
  max-height: unset;
}
.v-text-field .v-input__prepend-inner,
.v-text-field .v-input__append-inner {
  margin-top: 8px;
}
.v-input--checkbox {
  align-self: flex-start;
}
.bro-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}
.quiz-step-container {
  max-width: 100%;
}
.v-select.v-text-field--enclosed:not(.v-text-field--single-line)
  .v-select__selections {
  padding-top: inherit;
}
.step7 .v-select .v-select__selections,
.step5 .v-select .v-select__selections {
  width: 40px;
}
.step5 .bro-row,
.step7 .bro-row {
  width: 310px;
}
.step7 .v-select,
.step5 .v-select {
  margin-right: 10%;
}
.step7 .v-select:nth-last-child(1),
.step5 .v-select:nth-last-child(1) {
  margin-right: 0;
}
.step7 .v-select:nth-last-child(1) .v-select__selections,
.step5 .v-select:nth-last-child(1) .v-select__selections {
  width: 70px;
}
.step7 .v-select:nth-last-child(2) .v-select__selections,
.step5 .v-select:nth-last-child(2) .v-select__selections {
  width: 90px;
}
.step7 .v-input,
.step5 .v-input {
  margin-top: 0;
}
.step6 .v-input--checkbox {
  align-self: auto;
}
.step9 .bro-row {
  align-items: stretch;
  justify-content: space-between;
}
.step9 .bro-col {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.step9 .bro-img {
  cursor: pointer;
  width: 100%;
  height: 110px;
  background-size: contain;
  background-position: center;
  background-position-x: center;
  background-position-y: center;
  margin-bottom: 12px;
}
.step9 .bro-vnalichii {
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 20px;
  min-width: 100px;
  text-align: center;
  background: rgba(55, 69, 97, 0.05);
  border-radius: 17px;
  color: rgba(55, 69, 97, 0.7);
  position: relative;
  padding-left: 15px;
  margin-bottom: 5px;
}
.step9 .bro-vnalichii:before {
  display: inline-block;
  position: absolute;
  content: "\2714	";
  color: #e5a04e;
  left: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
}
.step9 h4 {
  cursor: pointer;
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  text-decoration-line: underline;
  margin-bottom: 5px;
  height: 34px;
  overflow: hidden;
}
.step9 .bro-price {
  margin-bottom: 10px;
}
.step9 .bro-price small {
  display: inline-block;
  margin-right: 5px;
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 17px;
  text-decoration-line: line-through;
  color: rgba(55, 69, 97, 0.5);
}
.step9 .bro-price span {
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 22px;
  color: #e5a04e;
}
.step9 button.v-btn.v-btn--outline.bro-btn-next.indigo--text {
  width: 100%;
}
.step9 button.v-btn.v-btn--outline.bro-btn-next.indigo--text .v-btn__content {
  font-weight: 900;
}
.step9 button.v-btn.v-btn--outline.bro-btn-next.green--text {
  margin: 0 auto;
  padding: 5px;
  min-width: unset;
  width: 100%;
}
</style>