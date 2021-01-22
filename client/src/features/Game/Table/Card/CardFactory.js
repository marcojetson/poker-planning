class CardFactory {

  static create(id, color, value, icon) {
    return { id: id, color: color ,value: value, icon: icon }
  };
}

export default CardFactory;
