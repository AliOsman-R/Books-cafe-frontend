export const cafeInitialState ={
    name: '',
    phoneNumber: '',
    state: 'Kuala Lumpur',
    city: '',
    address: '',
    bio: '',
    latitude:'',
    longitude:'',
  }
  
  export const userInitialState = {
    name: "",
    email: "",
    phoneNumber: "",
    profileImage: "",
    firstAddress: "",
    secondAddress: ""
  };
  
  export const bookInitialState = {
    title: '',
    author: '',
    genre: '',
    price: 0,
    description: '',
    stock: 0,
    publishYear: 0,
    images: [],
    bookPlaceImages: [],
    availability: 'Selling',
    status:'Available'
  }


  export const menuInitialState = {
    name: '',
    type: '',
    status: 'Available',
    price: 0,
    isCountable:true,
    description: '',
    stock: 0,
    ingredients: [],
    images: [],
  }

  export const eventInitialState = {
    title: '',
    location: '',
    date: new Date(),
    startTime: '',
    endTime:'',
    description: '',
    images: [],
  }

