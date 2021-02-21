import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      if (this.props?.onClose) {
        this.props.onClose();
      }
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      if (this.props?.onClose) {
        this.props.onClose();
      }
    }
  };

  render() {
    return createPortal(
      <div className={s.Modal__backdrop} onClick={this.handleBackdropClick}>
        <div className={s.Modal__content}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
