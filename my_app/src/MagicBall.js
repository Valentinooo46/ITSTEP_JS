import React, { Component } from 'react';
class MagicBall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
    };
    this.answers = [
      'Без сумніву',
      'Так, звісно',
      'Це гарантовано',
      'Скоріше за все',
      'Спробуй ще раз',
      'Наразі не можу сказати',
      'Краще не розповідати',
      'Не розраховуй на це',
      'Мої джерела кажуть — ні',
      'Виглядає сумнівно',
    ];
  }

  shakeBall = () => {
    const randomIndex = Math.floor(Math.random() * this.answers.length);
    this.setState({ answer: this.answers[randomIndex] });
  };

  render() {
    return (
      <div className="text-center mt-5 p-4 border rounded bg-dark text-white">
        <h4>🔮 Магічна куля передбачень</h4>
        <button className="btn btn-light mt-3" onClick={this.shakeBall}>
          Задати питання
        </button>
        {this.state.answer && (
          <div className="mt-4">
            <h5>Відповідь:</h5>
            <p className="lead">{this.state.answer}</p>
          </div>
        )}
      </div>
    );
  }
}
export default MagicBall;