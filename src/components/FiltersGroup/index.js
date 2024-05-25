import {BsSearch} from 'react-icons/bs'
import './index.css'
const FiltersGroup = props => {
  const renderFilterList = () => {
    const {ratingsList} = props
    ratingsList.map(rating => {
      const {activeRating, changeRating} = props
      const ratingClassName =
        rating.ratingId === activeRating ? 'ratings app' : 'ratings'
      const onClickRatingId = () => changeRating(rating.ratingId)
      return (
        <li
          className="list-container"
          key={rating.ratingId}
          onClick={onClickRatingId}
        >
          <img
            src={rating.imageUrl}
            alt={`rating ${rating.ratingId}`}
            className="image-1"
          />
          <p className={ratingClassName}>& up</p>
        </li>
      )
    })
  }
  const ratingsList = () => (
    <div className="containers">
      <h1 className="header">Rating</h1>
      <ul className="unorder-list">{renderFilterList()}</ul>
    </div>
  )
  const renderCategoryList = () => {
    const {categoryOptions} = props
    categoryOptions.map(category => {
      const {activeCategory, changeCategory} = props
      const onClickOptionsCategory = () => changeCategory(category.categoryId)
      const categoryS =
        activeCategory === category.categoryId ? 'categorys name' : 'categorys'
      return (
        <li className="contain" onClick={onClickOptionsCategory}>
          <p className={categoryS}>{category.name}</p>
        </li>
      )
    })
  }
  const renderCategoryFilter = () => (
    <div className="cons">
      <h1 className="heads">Category</h1>
      <ul className="unorder">{renderCategoryList()}</ul>
    </div>
  )
  const renderSearchInput = () => {
    const onClickSearchKey = event => {
      const {eventKey} = props
      if (event.key === 'Enter') {
        eventKey()
      }
    }
    const onClickChangeInput = event => {
      const {changeInput} = props
      changeInput(event.target.value)
    }
    const {searchInput} = props
    return (
      <div className="conssss">
        <input
          type="search"
          value={searchInput}
          onChange={onClickChangeInput}
          onKeyDown={onClickSearchKey}
          className="input-container"
          placeholder="Search"
        />
      </div>
    )
  }
  const {clearFilter} = props
  return (
    <div className="bg-containers">
      {renderSearchInput()}
      {renderCategoryFilter()}
      {ratingsList()}
      <button onClick={clearFilter} className="button-container">
        Clear Filter
      </button>
    </div>
  )
}
export default FiltersGroup
