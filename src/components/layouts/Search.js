import React from 'react'
import '../styles/Search.css'
import Background from '../../img/city.jpg'
import {Search} from '@material-ui/icons'

function SearchComponent() {
    return (
        <div className="search" style={{
            backgroundImage: `url(${Background})`, 
            backgroundSize: "cover", 
            backgroundRepeat: "no-repeat", 
            height: "100vh",
            paddingTop: "50px",
            objectFit: "contain"
        }}>
            <div className="container container-sm align-items-center">
                <div className="cover-content">
                    <h2 className="text-center mt-5">
                    Look for apartments and studios on rent nearby!
                    </h2>
                    <div class="input-group mb-3 justify-content-center">
                        <input 
                            type="text" 
                            class="form-control col-md-7" 
                            placeholder="kotto" 
                            aria-label="kotto" 
                            aria-describedby="button-addon2"
                        />
                        <div class="input-group-append">
                            <button class="btn-search" type="button" id="button-addon2">
                                <Search /> Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchComponent

