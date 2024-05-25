import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]
const apiCallOfStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    activeCategoryId: '',
    activeRatingId: '',
    searchInput: '',
    apiStatus: apiCallOfStatus.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiCallOfStatus.inprogress,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied
    const {activeOptionId, activeCategoryId, activeRatingId, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiCallOfStatus.success,
      })
    } else {
      this.setState({apiStatus: apiCallOfStatus.failure})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }
  renderFailureView = () => (
    <div className="con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="imagesss"
      />
      <h1 className="headers">Oops Something Went Wrong</h1>
      <p className="paragraph">
        We are having some trouble processing your request. please try again.
      </p>
    </div>
  )

  renderProductsListView = () => {
    const {productsList, activeOptionId} = this.state
    const renderProductList = productsList.length > 0

    return renderProductList ? (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          changeSortby={this.changeSortby}
          sortbyOptions={sortbyOptions}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="oops-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          alt="no products"
          className="products"
        />
        <h1 className="main-header">No Products Found</h1>
        <p className="parssss">
          We could not find any Products Try another Products.
        </p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus}=this.state 
    switch (apiStatus) {
      case apiCallOfStatus.success:
        return this.renderProductsListView()
      case apiCallOfStatus.failure:
        return this.renderFailureView()
      case apiCallOfStatus.inprogress:
        return this.renderLoader()
      default:
        return null
    }
  }
  clearFilters = () => {
    this.setState(
      {
        searchInput: '',
        activeCategoryId: '',
        activeRatingId: '',
      },
      this.getProducts,
    )
  }
  changeRating = () => {
    const {activeRatingId}=this.state
    this.setState({activeRatingId}, this.getProducts)
  }
  changeCategory = () => {
    const {activeCategoryId}=this.state 
    this.setState({activeCategoryId}, this.getProducts)
  }
  enterSearchInput = () => {
    //change SearchkeyInput
    this.getProducts()
  }
  changeSearchInput = () => {
    const {searchInput}=this.state
    this.setState({searchInput})
  }
  render() {
    const {searchInput, activeCategoryId, activeRatingId} = this.state
    return (
      <div className="bg-cont">
        <FiltersGroup
          searchInput={searchInput}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeInput={this.changeSearchInput}
          eventKey={this.enterSearchInput}
          activeCategory={activeCategoryId}
          activeRating={activeRatingId}
          clearFilter={this.clearFilters}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
        />
      </div>
    )
  }
}

export default AllProductsSection
