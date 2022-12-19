<template>
  <q-card-section>
    <q-form ref="form" @validation-error="onValidationError" greedy>
      <q-card
        flat
        bordered
        class="fields-card"
        style="margin-bottom: 1rem"
      >
        <q-card-section>
          <div class="text-h6" style="display: flex">
            <i
              class="fa-solid fa-tags"
              style="color: #a00000"
            ></i>
            <!-- <q-icon name="label_important" style="color: #a00000"></q-icon> -->
            <span class="card-header">Personal Information</span>
          </div>

          <q-separator style="margin-bottom: 1.5rem" />

          <div class="row q-col-gutter-md">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <q-input
                outlined
                standout
                bottom-slots
                label="Given name"
                v-model="info.given_name"
                v-required
                v-uppercase
                :rules="[
                  val => val && val.trim().length > 0 || 'This field is required'
                ]"
              />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <q-input
                outlined
                standout
                bottom-slots
                label="Middle name"
                v-model="info.middle_name"
                v-required
                v-uppercase
                :rules="[
                  val => val && val.trim().length > 0 || 'This field is required'
                ]"
              />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <q-input
                outlined
                standout
                bottom-slots
                label="Last name"
                v-model="info.last_name"
                v-required
                v-uppercase
                :rules="[
                  val => val && val.trim().length > 0 || 'This field is required'
                ]"
              />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <q-input
                outlined
                standout
                bottom-slots
                label="Mobile number"
                v-model="info.mobile_number"
                v-required
                v-uppercase
                :rules="[
                  val => val && val.trim().length > 0 || 'This field is required'
                ]"
              />
            </div>
          </div>
        </q-card-section>

      </q-card>

      <q-card
        flat
        bordered
        class="fields-card"
        style="margin-bottom: 1rem"
      >
        <q-card-section>
          <div class="text-h6" style="display: flex">
            <i
              class="fa-solid fa-tags"
              style="color: #a00000"
            ></i>
            <!-- <q-icon name="label_important" style="color: #a00000"></q-icon> -->
            <span class="card-header">Company Information</span>
          </div>

          <q-separator style="margin-bottom: 1.5rem" />

          <div class="row q-col-gutter-md">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <q-select
                ref="company"
                outlined standout
                bottom-slots
                use-input
                input-debounce="0"
                :options="company_options"
                label="Client Company Name"
                v-model="info.company"
                option-label="name"
                option-value="name"
                :rules="[
                  val => (val?.id || false) ? true : false || 'This field is required'
                ]"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-italic text-grey">
                      No data available
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <q-input
                outlined
                standout
                bottom-slots
                label="Member Affiliation"
                v-model="info.member_affiliation"
                v-required
                v-uppercase
                disable
                class="no-pointer"
              />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <q-input
                outlined
                standout
                bottom-slots
                label="Company Number"
                v-model="info.company_number"
                v-required
                v-uppercase
                disable
                class="no-pointer"
              />
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6">
              <q-input
                outlined
                standout
                bottom-slots
                label="Telephone Number"
                v-model="info.tel_number"
                v-required
                disable
                class="no-pointer"
              />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <q-input
                outlined
                standout
                bottom-slots
                label="Alternative Telephone Number"
                v-model="info.alt_tel_number"
                v-required
                disable
                class="no-pointer"
              />
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6">
              <q-input
                outlined
                standout
                bottom-slots
                label="Contact Person"
                v-model="info.contact_person"
                v-required
                disable
                class="no-pointer"
              />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <q-input
                outlined
                standout
                bottom-slots
                label="Contact Person Email"
                v-model="info.contact_person_email"
                v-required
                disable
                class="no-pointer"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-card-section>
</template>
<script>
export default {
  props: ['allow_action', 'user_details'],
  data: () => ({
    company_options: [],
    info: {
      given_name: null,
      middle_name: null,
      last_name: null,
      mobile_number: null,

      company: null,
      member_affiliation: null,
      company_number: null,
      tel_number: null,
      alt_tel_number: null,
      contact_person: null,
      contact_person_email: null,
    }
  }),

  watch: {
    'info.company'(new_value) {
      console.log('company', new_value)
      this.company_select_one(new_value?.id || null);
    }
  },

  methods: {
    async init_app() {
      this.company_options = await this.$company.options();

      this.$nextTick(() => {
        this.reset_details();
      })
    },

    reset_details() {
      let details = this.user_details;
      this.info.given_name = details?.fname || null;
      this.info.middle_name = details?.mname || null;
      this.info.last_name = details?.lname || null;
      this.info.mobile_number = details?.phone || null;

      let comp_id = details?.compId || null;
      let company = this.company_options.find(i => {
        return i.id === comp_id;
      })

      this.info.company = company || null;
    },

    async company_select_one(id) {
      let details = await this.$company.details(id);

      console.log('details', details)

      this.info.member_affiliation = details?.affiliate?.name || null;
      this.info.company_number = details?.mobile || null;
      this.info.tel_number = details?.phone || null;
      this.info.alt_tel_number = details?.mobile || null;
      this.info.contact_person = details?.contactId || null;
      this.info.contact_person_email = details?.contactId || null;
    },

    onValidationError(ref) {
      // console.log('onValidationError', ref)
    },

    on_submit_update(callback) {
      this.$refs.form.validate().then((success) => {
        if (success) {
          callback(this.info)
        }
        else {
          this.$q.notify({
            message: 'Form validaton failed. Please double check your data.',
            icon: 'report_problem',
            timeout: 3000,
            position: "top-right",
            color: "negative",
            multiLine: true,
            actions: [
              { label: 'Dismiss', color: 'white', handler: () => {} }
            ]
          })
        }
      })
    }
  },

  mounted() {
    this.$emit('update:allow_action', true);
    this.init_app();
  }
}
</script>

<style lang="scss" scoped>
.fields-card {
  border: 1px solid #d8d8d8;
  border-radius: 0;
  box-shadow: 5px 4px 5px 1px rgb(0 0 0 / 10%) !important;
  -webkit-box-shadow: 5px 4px 5px 1px rgb(0 0 0 / 10%) !important;
  -moz-box-shadow: 5px 4px 5px 1px rgba(0, 0, 0, 0.1) !important;

  .card-header {
    font: 400 15px/24px Roboto, Helvetica Neue, sans-serif;
    letter-spacing: normal;
    margin: 0 0 16px;
    padding-left: 10px;
  }
  .card-sub-header {
    padding-left: 0;
    font-weight: 500;
    font: 400 15px/24px Roboto, Helvetica Neue, sans-serif;
    letter-spacing: normal;
    margin: 0 0 16px;
  }
}

</style>
