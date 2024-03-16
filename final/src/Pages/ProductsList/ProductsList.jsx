// import styled from "styled-components";
// import { useLocation } from "react-router";
// import { useState, useEffect } from "react";
// import axios from "axios";


// import Announcement from "../../Components/Announcement";
// import Footer from "../../Components/Footer";
// import Navbar from "../../Components/Navbar";
// import Newsletter from "../../Components/NewsLetter";
// import Products from "../../Components/Products";
// import { mobile } from "../../responsive";

// const Container = styled.div``;

// const Title = styled.h1`
//   margin: 20px;
// `;

// const FilterContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
  
  
// `;

// const Filter = styled.div`
//   margin: 20px;
//   ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column",fontSize:'9px' })}
// `;

// const FilterText = styled.span`
//   font-size: 20px;
//   font-weight: 600;
//   margin-right: 20px;
//   ${mobile({ marginRight: "0px", fontSize:'12px', })}
// `;

// const Select = styled.select`
//   padding: 10px;
//   margin-right: 20px;
//   ${mobile({ margin: "10px 0px",width:'82px', fontSize:'10px' })}
// `;

// const Option = styled.option`
// ${mobile({ margin: "10px 0px",width:'50%',heigth:'100%'})}

// `;

// const ProductList = () => {
//   const location = useLocation();
//   const cat = location.pathname.split("/")[2];
//   const [filters, setFilters] = useState({});
//   const [sort, setSort] = useState("newest");
//   const [categoriesName, setCategories] = useState(null);


//   const handleFilters = (e) => {
//     const value = e.target.value;
//     setFilters({
//       ...filters,
//       [e.target.name]: value.toLowerCase(),
//     });
//   };

//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/categories/${cat}`);
//         if (response.data.success && response.data.data) {
//           setCategories(response.data.data.categoryName);
//         } else {
//           console.error(
//             "Invalid or empty data received from the server:",
//             response.data
//           );
//         }
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };

//     getCategories();
//   }, []);

//   return (
//     <Container>
//       <Navbar />
//       <Announcement />
//       <Title>{categoriesName} CATEGORY</Title>
//       <FilterContainer>
//         <Filter>
//           <FilterText>Filter Products:</FilterText>
//           <Select name="color" onChange={handleFilters}>
//             <Option disabled>Color</Option>
           
//             <Option>white</Option>
//             <Option>black</Option>
//             <Option>gold</Option>
//             <Option>silver</Option>
//             <Option>blue</Option>
//             <Option>brown</Option>
//             <Option>red</Option>
//             <Option>grey</Option>
            
//           </Select>
//           <Select name="size" onChange={handleFilters}>
//             <Option disabled>Size</Option>
           
//             <Option value='L'>L</Option>
//             <Option value='S'>S</Option>
//             <Option value='M'>M</Option>
//           </Select>
//         </Filter>
//         <Filter>
//           <FilterText>Sort Products:</FilterText>
//           <Select onChange={(e) => setSort(e.target.value)}>
//             <Option value="newest">Newest</Option>
//             <Option value="asc">Price (asc)</Option>
//             <Option value="desc">Price (desc)</Option>
//           </Select>
//         </Filter>
//       </FilterContainer>
//       <Products cat={cat} filters={filters} sort={sort} />
//       <Newsletter />
//       <Footer />
//     </Container>
//   );
// };

// export default ProductList;


// return (
//   <Container>
//     <Navbar />
//     <Announcement />
//     <Title>Products</Title>
//     <FilterContainer>
//       <Filter>
//         <FilterText>Filter Products:</FilterText>
//         <Select name="color" onChange={handleFilters}>
//           <option disabled>Color</option>
//           {products.map((product) =>
//             product.productCharacteristics.map((characteristic) => (
//               <option key={characteristic.color}>{characteristic.color}</option>
//             ))
//           )}
//         </Select>
//         <Select name="size" onChange={handleFilters}>
//           <option disabled>Size</option>
//           {products.map((product) =>
//             product.productCharacteristics.map((characteristic) => (
//               <option key={characteristic.size}>{characteristic.size}</option>
//             ))
//           )}
//         </Select>
//       </Filter>
//       <Filter>
//         <FilterText>Sort Products:</FilterText>
//         <Select onChange={(e) => setSort(e.target.value)}>
//           <Option value="newest">Newest</Option>
//           <Option value="asc">Price (asc)</Option>
//           <Option value="desc">Price (desc)</Option>
//         </Select>
//       </Filter>
//     </FilterContainer>
//     <Products cat={cat} filters={filters} sort={sort} />
//     <Footer />
//   </Container>
// );

// ProductList.js
import styled from "styled-components";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Announcement from "../../Components/Announcement";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import Newsletter from "../../Components/NewsLetter";
import Products from "../../Components/Products";
import { mobile } from "../../responsive";

import { useParams } from 'react-router-dom';


// const Container = styled.div``;

// const Title = styled.h1`
//   margin: 20px;
// `;

// const FilterContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

const Filter = styled.div`
  margin: 20px;
  ${mobile({
    margin: "0px 20px",
    display: "flex",
    flexDirection: "column",
    fontSize: '9px'
  })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px", fontSize: '12px' })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px", width: '82px', fontSize: '8.3px' })}
`;

const Option = styled.option`
  ${mobile({ margin: "10px 0px",height: '100%' })}
`;

const Container = styled.div``;
const Title = styled.h1`
 margin: 20px;
`;
const FilterContainer = styled.div`
 display: flex;

 justify-content: space-between;
`;
const SearchContainer = styled.div`
 margin: 20px;
 ${mobile({
    margin: '0px 20px',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '9px',
 })}
`;
const Input = styled.input`
 padding: 10px;
 margin-right: 20px;
 ${mobile({ margin: '10px 0px', width: '82px', fontSize: '10px' })}
`;

const ProductList = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [categoriesName, setCategories] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();

  const { categoryId } = useParams();

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value.toLowerCase(),
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/categories/${categoryId}`);
        if (response.data.success && response.data.data) {
          setCategories(response.data.data.categoryName);
        } else {
          console.error("Invalid or empty data received from the server:", response.data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    const fetchProducts = async () => {
      try {
        let url = `http://localhost:4000/api/products`;
        if (categoryId) {
          url = `http://localhost:4000/api/products/category/${categoryId}`;
        }

        const response = await axios.get(url);
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    getCategories();
    fetchProducts();
  }, [categoryId]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(products);
      return;
    }

    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{categoriesName} CATEGORY</Title>
      <FilterContainer>
        {/* <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>gold</Option>
            <Option>silver</Option>
            <Option>blue</Option>
            <Option>brown</Option>
            <Option>red</Option>
            <Option>grey</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option value='L'>L</Option>
            <Option value='S'>S</Option>
            <Option value='M'>M</Option>
          </Select>
        </Filter> */}
         <FilterContainer>
        <SearchContainer>
        <FilterText>Search By Name:</FilterText>
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </SearchContainer>
      </FilterContainer>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
            <Option value="az">Alphabetical (A to Z)</Option>
            <Option value="za">Alphabetical (Z to A)</Option>
            <Option value="oldtonew">Oldest to Newest</Option>
            <Option value="newtoold">Newest to Oldest</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={categoryId} filters={filters} sort={sort} filteredProductsALL={filteredProducts} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
