<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <h1>Logged!</h1>
      </div>
      <div class="col-md-1 offset-md-5">
        <button class="btn btn-info" @click="create()">Create</button>
        <!-- <button class="btn btn-primary">Insert</button> -->
      </div>
    </div>
    <div>
      <b-container fluid>
        <b-table show-empty stacked="md" :items="entidades.items" :fields="headers">
          <template slot="actions" slot-scope="row">
            <b-button size="sm" @click="edit(row.item, row.index, $event.target)" class="mr-1">Show</b-button>
            <!-- <b-button
              size="sm"
              @click="delete(row.item, row.index, $event.target)"
              class="mr-1"
            >Delete</b-button> -->
          </template>
        </b-table>

        <b-modal
          :id="infoModal.id"
          :title="infoModal.title"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
        >
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-12">
                <!-- Grupo -->
                <b-form-group
                  :state="grupoState"
                  label="Grupo"
                  label-for="grupo-input"
                  invalid-feedback="Grupo es obligatorio"
                >
                  <b-form-select
                    id="logo-input"
                    v-model="infoModal.content.grupoEntidadId"
                    :options="optionsGrupo"
                  ></b-form-select>
                </b-form-group>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <!-- Nombre -->
                <b-form-group
                  :state="nameState"
                  label="Nombre"
                  label-for="nombre-input"
                  invalid-feedback="Nombre es obligatorio"
                >
                  <b-form-input
                    id="nombre-input"
                    v-model="infoModal.content.nombre"
                    :state="nameState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <!-- Poblacion -->
                <b-form-group
                  :state="poblacionState"
                  label="Población"
                  label-for="poblacion-input"
                  invalid-feedback="Población es obligatoria"
                >
                  <b-form-input
                    id="poblacion-input"
                    v-model="infoModal.content.poblacion"
                    :state="poblacionState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <!-- Provincia -->
                <b-form-group
                  :state="provinciaState"
                  label="Provincia"
                  label-for="provincia-input"
                  invalid-feedback="Provincia es obligatoria"
                >
                  <b-form-input
                    id="provincia-input"
                    v-model="infoModal.content.provincia"
                    :state="provinciaState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <!-- Pais -->
                <b-form-group
                  :state="paisState"
                  label="País"
                  label-for="pais-input"
                  invalid-feedback="Pais es obligatorio"
                >
                  <b-form-input
                    id="pais-input"
                    v-model="infoModal.content.pais"
                    :state="paisState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <!-- codPostal -->
                <b-form-group
                  :state="codPostalState"
                  label="Cód. Postal"
                  label-for="codPostal-input"
                  invalid-feedback="Código Postal es obligatorio"
                >
                  <b-form-input
                    id="codPostal-input"
                    v-model="infoModal.content.codPostal"
                    :state="codPostalState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <!-- Telefono -->
                <b-form-group
                  :state="telefonoState"
                  label="Teléfono"
                  label-for="telefono-input"
                  invalid-feedback="Teléfono es obligatorio"
                >
                  <b-form-input
                    id="telefono-input"
                    v-model="infoModal.content.telefono"
                    :state="telefonoState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <!-- mail -->
                <b-form-group
                  :state="mailState"
                  label="Email"
                  label-for="email-input"
                  invalid-feedback="Email es obligatorio"
                >
                  <b-form-input
                    id="email-input"
                    v-model="infoModal.content.mail"
                    :state="mailState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <!-- Logo -->
                <b-form-group
                  :state="logoState"
                  label="Logo"
                  label-for="email-input"
                  invalid-feedback="Logo es obligatorio"
                >
                  <b-form-input
                    id="logo-input"
                    v-model="infoModal.content.logo"
                    :state="logoState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <!-- Estado -->
                <b-form-group
                  :state="estadoState"
                  label="Estado"
                  label-for="estado-input"
                  invalid-feedback="Logo es obligatorio"
                >
                  <b-form-select
                    id="logo-input"
                    v-model="infoModal.content.estado_Activo"
                    :options="options"
                  ></b-form-select>
                </b-form-group>
              </div>
            </div>
          </form>
        </b-modal>
      </b-container>
      <router-link to="/login">
        <button class="btn btn-primary">Logout</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
export default {
  computed: {
    ...mapState({
      // account: state => state.account,
      entidades: state => state.entidades.all
    })
  },
  created() {
    this.getAllEntidades();
  },
  methods: {
    ...mapActions("entidades", {
      getAllEntidades: "getAll",
      insertEntidades: "insert",
      deleteEntitidad: "delete"
    }),
    create(item, index, button) {
      this.infoModal.title = "Nueva entidad";
      let nuevaEntidad = {};
      Object.assign(nuevaEntidad, this.entidad);
      this.infoModal.content = nuevaEntidad;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    edit(item, index, button) {
      this.infoModal.title = "Ver información";
      this.infoModal.content = item;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid ? "valid" : "invalid";
      this.poblacionState = valid ? "valid" : "invalid";
      this.provinciaState = valid ? "valid" : "invalid";
      this.paisState = valid ? "valid" : "invalid";
      this.codPostalState = valid ? "valid" : "invalid";
      this.telefonoState = valid ? "valid" : "invalid";
      this.codpostalState = valid ? "valid" : "invalid";
      this.logoState = valid ? "valid" : "invalid";
      this.mailState = valid ? "valid" : "invalid";
      return valid;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      // bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      // if (!this.checkFormValidity()) {
      //   return;
      // }

      this.insertEntidades(this.infoModal.content);

      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs.form.hide();
      });

      this.getAllEntidades();
    }
  },
  data() {
    return {
      entidad: {
        grupoEntidadId: 1,
        grupoEntidadNombre: "",
        nombre: "",
        poblacion: "",
        provincia: "",
        pais: "",
        codPostal: "",
        telefono: "",
        mail: "",
        logo: "",
        estado_Activo: true
      },
      headers: [
        {
          key: "grupoEntidadNombre",
          sortable: true
        },
        {
          key: "nombre",
          sortable: true
        },
        {
          key: "poblacion",
          sortable: true
        },
        {
          key: "provincia",
          sortable: true
        },
        {
          key: "telefono",
          sortable: true
        },
        {
          key: "estado_Activo",
          sortable: true
        },
        {
          key: "actions",
          label: "Actions"
        }
      ],
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      },
      options: [
        { value: true, text: "Activo" },
        { value: false, text: "Inactivo" }
      ],
      optionsGrupo: [
        { value: 1, text: "Sabadell" },
        { value: 2, text: "Bankia" }
      ]
    };
  }
};
</script>