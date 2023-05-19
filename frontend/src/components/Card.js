import {Component} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

class Card extends Component {
    static contextType = CurrentUserContext;

    handleClick = () => {
        this.props.onCardClick(this.props.card);
    }

    handleLikeClick = () => {
        this.props.onCardLike(this.props.card)
    }

    handleDeleteClick = () => {
        this.props.onCardDelete(this.props.card)
    }

    render() {
        const isOwn = this.props.card.owner._id === this.context._id;
        const isLiked = this.props.card.likes.some(item => item._id === this.context._id);
        let cardLikeButtonClassName = 'element__like-button';
        if (isLiked) {
            cardLikeButtonClassName += ' element__like-button_active';
        }

        return (
            <article className="element">
                {isOwn && <button
                    className="element__trash-button"
                    onClick={this.handleDeleteClick}
                    type="button"></button>
                }
                <img
                    className="element__photo"
                    src={this.props.card.link}
                    onClick={this.handleClick}
                    alt={this.props.card.name}/>
                <div className="element__title">
                    <h2 className="element__name">
                        {this.props.card.name}
                    </h2>
                    <div className="element__like">
                        <button
                            className={cardLikeButtonClassName}
                            onClick={this.handleLikeClick}
                            type="button"></button>
                        <p className="element__likes">
                            {this.props.card.likes.length}
                        </p>
                    </div>
                </div>
            </article>
        )
    }
}

export default Card;