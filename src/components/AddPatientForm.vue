<!--<template>-->
<!--  <div class="container full-width overflow-x-scroll">-->
<!--    <div class="header flex">-->
<!--      <img class="icon-polese" src="../assets/img/img.png" alt="icon"/>-->
<!--      <h1>Adding a Patient</h1>-->
<!--    </div>-->

<!--    &lt;!&ndash;    <AlertWindow/>&ndash;&gt;-->
<!--    <div class="flex justify-content-center flex-wrap p-4">-->
<!--      <div class="p-field col">-->
<!--        <Button type="button" label="Scan Document" @click="captureDocument()"/>-->
<!--      </div>-->
<!--      <form @submit.prevent="registerPatient" class="flex flex-wrap grid">-->
<!--        <div class="p-field col-4">-->
<!--          <label for="firstName">First Name</label>-->
<!--          <InputText id="firstName" v-model="patient.givenName"/>-->
<!--        </div>-->
<!--        <div class="p-field col-4">-->
<!--          <label for="lastName">Last Name</label>-->
<!--          <InputText id="lastName" v-model="patient.familyName"/>-->
<!--        </div>-->
<!--        <div class="p-field col-4">-->
<!--          <label for="patronymic">Patronymic</label>-->
<!--          <InputText id="patronymic" v-model="patient.middleName"/>-->
<!--        </div>-->
<!--        <div class="p-field col-4">-->
<!--          <label for="birthDate">Date of Birth</label>-->
<!--          <Calendar id="birthDate" class="calendar" v-model="patient.birthDate" dateFormat="dd.mm.yy"/>-->
<!--        </div>-->
<!--        <div class="p-field col-4">-->
<!--          <label for="sex">Sex</label>-->
<!--          <div class="radio-group">-->
<!--            <div>-->
<!--              <label for="male">Male</label>-->
<!--              <input type="radio" id="male" value="1" v-model="patient.sex"/>-->
<!--            </div>-->
<!--            <div>-->
<!--              <label for="female">Female</label>-->
<!--              <input type="radio" id="female" value="2" v-model="patient.sex"/>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <DataTable class="documents col-12" :value="patient.addresses.addressDto" responsiveLayout="scroll"-->
<!--                   editMode="cell" @cell-edit-complete="onCellEditComplete"-->
<!--                   :pt="{-->
<!--        table: { style: 'min-width: 50rem' },-->
<!--        column: {-->
<!--            bodycell: ({ state }) => ({-->
<!--                class: [{ 'pt-0 pb-0': state['d_editing'] }]-->
<!--            })-->
<!--        }-->
<!--    }">-->
<!--          <Column field="city" header="Region">-->
<!--            <template #editor="{ data, field }">-->
<!--              <InputText v-model="data[field]"/>-->
<!--            </template>-->
<!--          </Column>-->
<!--          <Column field="street" header="Street">-->
<!--            <template #editor="{ data, field }">-->
<!--              <InputText v-model="data[field]"/>-->
<!--            </template>-->
<!--          </Column>-->
<!--          <Column field="building" header="Building Number">-->
<!--            <template #editor="{ data, field }">-->
<!--              <InputText v-model="data[field]"/>-->
<!--            </template>-->
<!--          </Column>-->
<!--          <Column field="appartment" header="Apartment Number">-->
<!--            <template #editor="{ data, field }">-->
<!--              <InputText v-model="data[field]"/>-->
<!--            </template>-->
<!--          </Column>-->
<!--          <Column field="stringAddress" header="Address Line">-->
<!--            <template #editor="{ data, field }">-->
<!--              <InputText v-model="data[field]"/>-->
<!--            </template>-->
<!--          </Column>-->
<!--        </DataTable>-->
<!--        <div class="p-field col-3">-->
<!--          <label for="contactInfo">Phone Number</label>-->
<!--          <InputText id="contactInfo" v-model="phoneNumber"/>-->
<!--        </div>-->
<!--        <div class="p-field col-3">-->
<!--          <label for="contactInfo">Email</label>-->
<!--          <InputText id="contactInfo" v-model="email"-->
<!--                     placeholder="Optional"/>-->
<!--        </div>-->
<!--        <div class="p-field col-3">-->
<!--          <label for="height">Height</label>-->
<!--          <InputText id="height" v-model="patient.height"/>-->
<!--        </div>-->
<!--        <div class="p-field col-3">-->
<!--          <label for="weight">Weight</label>-->
<!--          <InputText id="weight" v-model="patient.weight"/>-->
<!--        </div>-->
<!--        <DataTable class="documents col-12" :value="patient.documents.documentDto" responsiveLayout="scroll"-->
<!--                   editMode="cell" @cell-edit-complete="onCellEditComplete"-->
<!--                   :pt="{-->
<!--        table: { style: 'min-width: 50rem' },-->
<!--        column: {-->
<!--            bodycell: ({ state }) => ({-->
<!--                class: [{ 'pt-0 pb-0': state['d_editing'] }]-->
<!--            })-->
<!--        }-->
<!--    }">-->
<!--          <Column field="docS" header="Document Series">-->
<!--            <template #editor="{ data, field }">-->
<!--              <InputText v-model="data[field]"/>-->
<!--            </template>-->
<!--          </Column>-->
<!--          <Column field="docN" header="Document Number">-->
<!--            <template #editor="{ data, field }">-->
<!--              <InputText v-model="data[field]"/>-->
<!--            </template>-->
<!--          </Column>-->
<!--          <Column field="documentName" header="Document Name">-->
<!--            <template #editor="{ data, field }">-->
<!--              <InputText v-model="data[field]"/>-->
<!--            </template>-->
<!--          </Column>-->
<!--          <Column field="providerName" header="Issued By">-->
<!--            <template #editor="{ data, field }">-->
<!--              <InputText v-model="data[field]"/>-->
<!--            </template>-->
<!--          </Column>-->
<!--          <Column field="idDocumentType" header="Document Identifier">-->
<!--            <template #editor="{ data, field }">-->
<!--              <InputText v-model="data[field]"/>-->
<!--            </template>-->
<!--          </Column>-->
<!--          <Column field="issuedDate" header="Start Date">-->
<!--            <template #editor="{ data, field }">-->
<!--              <InputText v-model="data[field]"/>-->
<!--            </template>-->
<!--          </Column>-->
<!--        </DataTable>-->
<!--        <div class="p-field col-3 flex flex-row justify-content-between">-->
<!--          <label for="printable">Print Bracelet</label>-->
<!--          <InputSwitch id="printable" v-model="patient.printable"/>-->
<!--        </div>-->
<!--        <div class="p-field col-12">-->
<!--          <Button label="Register Patient" @click="addPatient"/>-->
<!--        </div>-->
<!--      </form>-->
<!--    </div>-->
<!--  </div>-->
<!--  &lt;!&ndash;  <SpeechRecognition class="SpeechRec"/>&ndash;&gt;-->
<!--</template>-->
<template>
  <div class="container full-width overflow-x-scroll">
    <div class="header flex">
      <h1>Добавление пациента</h1>
    </div>

    <!--    <AlertWindow/>-->
    <div class="flex justify-content-center flex-wrap p-4">
      <div class="p-field  col">
        <Button type="button" label="Сканировать документ" @click="captureDocument()"/>
      </div>
      <form @submit.prevent="registerPatient" class=" flex flex-wrap grid">
        <div class="p-field  col-4">
          <label for="firstName">Имя</label>
          <InputText id="firstName" v-model="patient.givenName"/>
        </div>
        <div class="p-field  col-4">
          <label for="lastName">Фамилия</label>
          <InputText id="lastName" v-model="patient.familyName"/>
        </div>
        <div class="p-field  col-4">
          <label for="patronymic">Отчество</label>
          <InputText id="patronymic" v-model="patient.middleName"/>
        </div>
        <div class="p-field  col-4 ">
          <label for="birthDate">Дата Рождения</label>
          <Calendar id="birthDate" class="calendar" v-model="patient.birthDate" dateFormat="dd.mm.yy"/>
        </div>
        <!--        <div class="p-field col-4 ">-->
        <!--          <label for="deathDate">Дата смерти</label>-->
        <!--          <Calendar id="deathDate" class="calendar" v-model="patient.deathDate" dateFormat="yy-mm-dd"-->
        <!--                    placeholder="Необязательно"/>-->
        <!--        </div>-->
        <div class="p-field col-4">
          <label for="sex">Пол</label>
          <div class="radio-group">
            <div>
              <label for="male">Мужской</label>
              <input type="radio" id="male" value="1" v-model="patient.sex"/>
            </div>
            <div>
              <label for="female">Женский</label>
              <input type="radio" id="female" value="2" v-model="patient.sex"/>
            </div>
          </div>
        </div>
        <DataTable class="documents col-12" :value="patient.addresses.addressDto" responsiveLayout="scroll"
                   editMode="cell" @cell-edit-complete="onCellEditComplete"
                   :pt="{
        table: { style: 'min-width: 50rem' },
        column: {
            bodycell: ({ state }) => ({
                class: [{ 'pt-0 pb-0': state['d_editing'] }]
            })
        }
    }"
        >
          <Column field="city" header="Регион">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]"/>
            </template>
          </Column>
          <Column field="street" header="Улица">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]"/>
            </template>
          </Column>
          <Column field="building" header="Номер дома">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]"/>
            </template>
          </Column>
          <Column field="appartment" header="Номер Квартиры">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]"/>
            </template>
          </Column>
          <Column field="stringAddress" header="Адрес строкой">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]"/>
            </template>
          </Column>
        </DataTable>
        <div class="p-field col-3">
          <label for="contactInfo">Номер телефона</label>
          <InputText id="contactInfo" v-model="phoneNumber"/>
        </div>
        <div class="p-field col-3">
          <label for="contactInfo">Электронная почта</label>
          <InputText id="contactInfo" v-model="email"
                     placeholder="Необязательно"/>
        </div>
        <div class="p-field col-3">
          <label for="height">Рост</label>
          <InputText id="height" v-model="patient.height"/>
        </div>
        <div class="p-field col-3">
          <label for="weight">Вес</label>
          <InputText id="weight" v-model="patient.weight"/>
        </div>
        <DataTable class="documents col-12" :value="patient.documents.documentDto" responsiveLayout="scroll"
                   editMode="cell" @cell-edit-complete="onCellEditComplete"
                   :pt="{
        table: { style: 'min-width: 50rem' },
        column: {
            bodycell: ({ state }) => ({
                class: [{ 'pt-0 pb-0': state['d_editing'] }]
            })
        }
    }">
          <Column field="docS" header="Серия документа">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]"/>
            </template>
          </Column>
          <Column field="docN" header="Номер документа">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]"/>
            </template>
          </Column>
          <Column field="documentName" header="Название документа">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]"/>
            </template>
          </Column>
          <Column field="providerName" header="Выдан">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]"/>
            </template>
          </Column>
          <Column field="idDocumentType" header="Идентификатор документа">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]"/>
            </template>
          </Column>
          <Column field="issuedDate" header="Дата начала">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]"/>
            </template>
          </Column>
        </DataTable>
        <div class="p-field col-3 flex flex-row justify-content-between">
          <label for="printable">Распечатать браслет</label>
          <InputSwitch id="printable" v-model="patient.printable"/>
        </div>
        <div class="p-field col-12">
          <Button label="Зарегистрировать пациента" @click="addPatient"/>
        </div>
      </form>
    </div>
  </div>
  <!--  <SpeechRecognition class="SpeechRec"/>-->
</template>
<script>

import {mapState, mapActions} from 'vuex';
import axios from "axios";

export default {
  components: {

  },
  data() {
    return {
      tags: [],
      patientToSend: {},
      patient: {
        printable: false,
        addresses: {
          addressDto: []
        },
        birthDate: "",
        contacts: {
          contactDto: [{
            contactValue: null,
            idContactType: 1
          }, {
            contactValue: null,
            idContactType: 3
          }]
        },
        deathTime: null,
        documents: {
          documentDto: []
        },
        familyName: "",
        givenName: "",
        idBloodType: 1,
        idLivingAreaType: 1,
        idPatientMIS: "",
        isVip: false,
        middleName: "",
        sex: null,
        height: 0,
        weight: 0
      },
      phoneNumber: null,
      email: null,
      sexOptions: [
        {label: 'Мужской', value: 1},
        {label: 'Женский', value: 2}
      ],
      contactTypes: [
        {label: 'Телефон', value: 'phone'},
        {label: 'Электронная почта', value: 'email'},
      ],
      monthMap: {
        'января': '01',
        'февраля': '02',
        'марта': '03',
        'апреля': '04',
        'мая': '05',
        'июня': '06',
        'июля': '07',
        'августа': '08',
        'сентября': '09',
        'октября': '10',
        'ноября': '11',
        'декабря': '12'
      }
    };
  },
  computed: {
    ...mapState('transcript', ['transcript']),
  },
  watch: {
    transcript(newTranscript) {
      console.log(newTranscript)
      if (newTranscript) {
        this.fillFormFields(newTranscript)
      }
    }
  },
  methods: {
    ...mapActions('transcript', ['setTranscript', 'clearTranscript']),
    parseStringToDate(dateStr) {
      const parts = dateStr.split(".");
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // JavaScript counts months from 0
        const year = parseInt(parts[2], 10);

        const date = new Date(year, month, day);
        if (!isNaN(date.getTime())) {
          return date;
        } else {
          throw new Error("Invalid date format");
        }
      } else {
        throw new Error("Invalid date format");
      }
    },
    formatDateToYYYYMMDD(date) {
      if (!(date instanceof Date) || isNaN(date)) {
        throw new Error("Invalid date provided");
      }
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    async addPatient() {
      this.patientToSend = this.patient
      if (this.phoneNumber !== null) {
        this.patientToSend.contacts.contactDto.push({
          contactValue: this.phoneNumber,
          idContactType: 1
        });
      }
      if (this.email !== null) {
        this.patientToSend.contacts.contactDto.push({
          contactValue: this.email,
          idContactType: 3
        });
      }
      this.patientToSend.contacts.contactDto[0].contactValue = this.phoneNumber
      this.patientToSend.contacts.contactDto[1].contactValue = this.email
      this.patientToSend.birthDate = this.formatDateToYYYYMMDD(this.patient.birthDate)
      this.patientToSend.documents.documentDto = this.patient.documents.documentDto.map((doc) => {
        return {
          ...doc,
          issuedDate: this.formatDateToYYYYMMDD(doc.issuedDate),
          expiredDate: this.formatDateToYYYYMMDD(doc.expiredDate)
        };
      });

      this.patientToSend.contacts.contactDto.forEach((contact, index) => {
        if (contact.contactValue === null) {
          this.patientToSend.contacts.contactDto.splice(index, 1);
        }
      });

      let url = '/egisz/patients'
      return await axios.post(url, this.patientToSend).then(
          (resp) => {
            if (this.patient.printable) {
              console.log(JSON.stringify(resp.data))
              const printBody =
                  {
                    "birthDate": this.parseDateToRu(this.patientToSend.birthDate),
                    "visitDate": this.parseDateTimeToRu(resp.data.visit.startTime),
                    "fullName": `${this.patient.familyName} ${this.patient.givenName} ${this.patient.middleName}`,
                    "pid": resp.data.patient.idPatientMis
                  }
              console.log(printBody)
              axios.post('http://192.168.20.162:8096/Integration/print-web-service/Execute', printBody).then(
                  (resp) => {
                    this.patient = {}
                    this.patientToSend = {}
                    console.log(JSON.stringify(resp.data))
                    this.$router.push('/main/archive')
                  },
                  (err) => {
                    this.$toast.add({severity: 'error', summary: 'Ошибка', detail: err.response.data, life: 60000});
                  });
            } else {
              this.patient = {}
              this.patientToSend = {}
              this.$router.push('/main/archive')
            }
          },
          (err) => {
            this.$toast.add({severity: 'error', summary: 'Ошибка', detail: err.response.data, life: 60000});
          }
      ).finally(() => {
        this.loadingMap = false;
      });

    },
    parseDate(value) {
      const [day, month, year] = value.split(' ').map(item => item.trim());
      const monthNumber = this.monthMap[month.toLowerCase()];
      if (monthNumber && year) {
        return `${year}-${monthNumber}-${day.padStart(2, '0')}`;
      } else {
        console.warn(`Неверный формат даты: ${value}`);
        return value;
      }
    },
    onCellEditComplete(event) {
      let {data, newValue, field} = event;
      console.log(data)
      console.log(newValue)
      console.log(field)
      data[field] = newValue;

    },

    // captureDocument() {
    //   const url = `http://192.168.20.162:8080/CaptureDocument`;
    //   axios.get(url).then(resp=>{
    //         const mainData = resp.data
    //         const fields = mainData.fields;
    //         console.log(fields)
    //         // Map scanned data to backend fields
    //         if (mainData.doc_type === "rus.passport.national") {
    //           this.patient.sex = fields.gender?.value === "МУЖ." ? 1 : 2; // 1 for male, 2 for female
    //           this.patient.familyName = fields.surname?.value || "";
    //           this.patient.givenName = fields.name?.value || "";
    //           this.patient.middleName = fields.patronymic?.value || "";
    //           this.patient.birthDate = this.parseStringToDate(fields.birthdate)?.value || "";
    //           this.patient.documents.documentDto.push({
    //             docN: fields.number?.value || null,
    //             docS: fields.series?.value || null,
    //             expiredDate: this.parseStringToDate(fields.expiry_date)?.value || null,
    //             issuedDate: this.parseStringToDate(fields.issue_date)?.value || null,
    //
    //
    //             documentName: "Паспорт гражданина РФ",
    //             idDocumentType: 14,
    //             providerName: fields.authority?.value || null,
    //             startDate: null
    //           });
    //
    //
    //         } else if (mainData.doc_type.startsWith("rus.snils.type")) {
    //           this.patient.documents.documentDto.push({
    //             docN: fields.number?.value || null,
    //             docS: fields.series?.value || null,
    //             expiredDate: this.parseStringToDate(fields.expiry_date)?.value || null,
    //             issuedDate: this.parseStringToDate(fields.registration_date)?.value || null,
    //
    //
    //             documentName: "СНИЛС",
    //             idDocumentType: 223,
    //             providerName: "ПФР",
    //             startDate: null
    //           });
    //         } else if (mainData.doc_type === "rus.passport.registration") {
    //           this.patient.addresses.addressDto.push({
    //             appartment: fields.apartment?.value || "",
    //             building: fields.house?.value || "",
    //             city: fields.region?.value || "",
    //             geoData: fields.geoCoordinates || "",
    //             idAddressType: 2, // Example type for residence address
    //             postalCode: fields.postalCode?.value || "",
    //             street: fields.street?.value || "",
    //             stringAddress: `${fields.region?.value || ""}, ${fields.street?.value || ""}, д. ${fields.house?.value || ""}, к. ${fields.building?.value || ""}, кв. ${fields.appartment?.value || ""}`,
    //             region: fields.district?.value || ""
    //           });
    //         }
    //
    //         // Example contact data (replace with scanner fields if available)
    //         this.patient.idPatientMIS = "auto-generated-id"; // Replace with dynamic value if needed
    //         console.log(JSON.stringify(this.patient))
    //       })
    //       .catch((error) => {
    //         console.error("Error capturing document:", error);
    //       });
    // },

    captureDocument() {
      this.patient = {
        "addresses": {
          "addressDto": [{
            "appartment": "",
            "building": "256",
            "city": "г. Санкт-Петербург",
            "geoData": "43.072812,-79.040128",
            "idAddressType": 2,
            "postalCode": 454100,
            "street": "пр. Хошимина, д. 11 к.1",
            "stringAddress": "г. Санкт-Петербург, пр. Хошимина, д. 11 к.1",
            "region": "Московский"
          }, {
            "appartment": "21",
            "building": "88",
            "city": "Санкт-Петербург",
            "geoData": "78, 64",
            "idAddressType": 4,
            "postalCode": 672157,
            "street": "Пироговская наб. 5/2",
            "stringAddress": "194044, Россия, Санкт-Петербург, Пироговская наб. 5/2",
            "region": "Адмиралтейский"
          }]
        },
        "birthDate": this.parseStringToDate("06.06.1986"),
        "contacts": {
          "contactDto": [{
            "contactValue": "89238364654",
            "idContactType": 1
          }, {
            "contactValue": "vova@gmail.com",
            "idContactType": 3
          }]
        },
        "deathTime": null,
        "documents": {
          "documentDto": [{
            "docN": "606226",
            "docS": "5258",
            "documentName": "Паспорт гражданина РФ",
            "expiredDate": "06.06.1986",
            "idDocumentType": 14,
            "idProvider": null,
            "issuedDate": "06.06.1986",
            "providerName": "УФМС",
            "regionCode": "128",
            "startDate": null
          }, {
            "docN": "84879331472",
            "docS": null,
            "expiredDate": "1991-06-06",
            "idDocumentType": 223,
            "idProvider": null,
            "issuedDate": "1990-06-06",
            "providerName": "ПФР",
            "regionCode": "128",
            "startDate": "1990-06-06"
          }]
        },
        "familyName": "Ивов",
        "givenName": "Иван",
        "idBloodType": 1,
        "idLivingAreaType": 1,
        "idPatientMIS": "ivan1",
        "isVip": false,
        "middleName": "Антонович",
        "sex": 1,
        "height": 180,
        "weight": 130
      }
    },
    fillFormFields(transcript) {
      console.log(transcript)
      transcript = transcript.replace(/(имя|фамилия|отчество|дата рождения|пол|номер квартиры|номер дома|наименование улицы|адрес строкой|контактная информация|тип контакта|номер документа|серия документа|дата выдачи|дата истечения|выдавший орган|дата смерти|наименование города|геокоординаты объекта)/g, match => match.replace(' ', '_'));
      const fields = transcript.split(';').map(field => field.trim());
      fields.forEach(field => {
        const [label, ...valueParts] = field.split(' ');
        const value = valueParts.join(' ').trim();
        console.log(label)
        console.log(value)
        switch (label) {
          case 'имя':
            this.patient.firstName = value;
            break;
          case 'фамилия':
            this.patient.lastName = value;
            break;
          case 'отчество':
            this.patient.patronymic = value;
            break;
          case 'дата_рождения':
            this.patient.birthDate = this.parseDate(value);
            break;
          case 'пол':
            this.patient.sex = value === 'мужской' ? 1 : 2;
            break;
          case 'номер_квартиры':
            this.patient.apartmentNumber = value;
            break;
          case 'номер_дома':
            this.patient.houseNumber = value;
            break;
          case 'наименование_улицы':
            this.patient.streetName = value;
            break;
          case 'адрес_строкой':
            this.patient.addressLine = value;
            break;
          case 'контактная_Информация':
            this.patient.contactInfo = value;
            break;
          case 'тип_Контакта':
            this.patient.contactType = value;
            break;
          case 'документ':
            this.patient.documents[0].documentName = value;
            break;
          case 'номер_документа':
            this.patient.documents[0].docN = value;
            break;
          case 'серия_документа':
            this.patient.documents[0].docS = value;
            break;
          case 'дата_выдачи':
            this.patient.documents[0].issuedDate = value;
            break;
          case 'дата_истечения':
            this.patient.documents[0].expiredDate = this.parseDate(value);
            break;
          case 'выдавший_орган':
            this.patient.documents[0].providerName = value;
            break;
          case 'дата_смерти':
            this.patient.deathDate = this.parseDate(value);
            break;
          case 'наименование_города':
            this.patient.city = value;
            break;
          case 'геокоординаты_объекта':
            this.patient.geoCoordinates = value;
            break;
          case 'индекс':
            this.patient.postalCode = value;
            break;
          default:
            console.warn(`Неизвестное поле: ${label}`);
        }
      });
    },
    registerPatient() {
      console.log('Patient data:', this.patient);
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}

.header {
  display: flex;
  color: #414D6B;
}

.header img {
  width: 65px;
  height: 70px;
  margin-right: 20px;
  color: #414D6B;
}

.header h2 {
  margin: 0;
}

.form-grid {
  width: 80%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.icon-polese {
  margin: 5px !important;
  margin-right: 20px !important;
}

.p-field {
  display: flex;
  flex-direction: column;
}

.p-field.full-width {
  grid-column: span 2;
}

label {
  margin-bottom: 5px;
}

input,
select,
button {
  width: 100%;
}

input {
  border-radius: 30px;
  padding-left: 15px;
}

.p-field Button {
  border-radius: 30px;
  margin: 10px;
}

Button {
  background-color: #414D6B;
}

#contactType {
  border-radius: 30px;
}

#sex {
  border-radius: 30px;
}

button {
  cursor: pointer;
}

.radio-group,
.checkbox-group {
  display: flex;
  flex-direction: column;
}

.radio-group div,
.checkbox-group div {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.radio-group label,
.checkbox-group label {
  margin-left: 10px;
  width: 50%;
}

.radio-group input,
.checkbox-group input {
  width: 50%;
  justify-items: right;
}

.SpeechRec {
  position: absolute;
  right: 30px;
  top: 150px;
}
</style>
