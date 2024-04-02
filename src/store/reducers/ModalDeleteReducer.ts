// modalSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalDeleteState {
  isOpen: boolean;
}

const initialState: ModalDeleteState = {
  isOpen: false,
};

const modalDeleteSlice = createSlice({
  name: 'modalDelete',
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalDeleteSlice.actions;

export default modalDeleteSlice.reducer;
