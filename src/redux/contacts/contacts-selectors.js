import { createSelector } from '@reduxjs/toolkit';

export const getAllContacts = state => state.contacts.items;

export const getFilter = state => state.contacts.filter;

export const getLoading = state => state.contacts.loading;

export const getVisibleContacts = createSelector(
  [getAllContacts, getFilter],
  (allContacts, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return allContacts.filter(el => {
      const foundPos = el.name.toLowerCase().indexOf(normalizedFilter);
      return foundPos === -1 ? false : true;
    });
  },
);

const operationSelectors = {
  getAllContacts,
  getFilter,
  getLoading,
  getVisibleContacts,
};

export default operationSelectors;
