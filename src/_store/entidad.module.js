import { entidadService } from '../_services';

const state = {
    all: {}
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        entidadService.getAll()
            .then(
                entidades => commit('getAllSuccess', entidades),
                error => commit('getAllFailure', error)
            );
    },
    getById({ commit }) {
        commit('getAllRequest');

        entidadService.getById()
            .then(
                entidades => commit('getAllSuccess', entidades),
                error => commit('getAllFailure', error)
            );
    },
    insert({ commit }, entity) {
        commit('insertRequest', entity);

        entidadService.insert(entity)
            .then(
                entity => commit('insertSuccess', entity),
                error => commit('insertFailure', { id, error: error.toString() })
            );
    },
    delete({ commit }, id) {
        commit('deleteRequest', id);

        entidadService.delete(id)
            .then(
                entidades => commit('deleteSuccess', id),
                error => commit('deleteFailure', { id, error: error.toString() })
            );
    }
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, entidades) {
        state.all = { items: entidades };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(entidad =>
            entidad.id === id
                ? { ...entidad, deleting: true }
                : entidad
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(entidad => entidad.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.items = state.items.map(entidad => {
            if (entidad.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...entidadCopy } = entidad;
                // return copy of user with 'deleteError:[error]' property
                return { ...entidadCopy, deleteError: error };
            }

            return entidad;
        })
    }
};

export const entidades = {
    namespaced: true,
    state,
    actions,
    mutations
};
