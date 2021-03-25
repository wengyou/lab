import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import "../static/style/search.scss";
import { Input, Select } from 'antd';
import * as resource from "../redux/actionCreators/resource";

const InputGroup = Input.Group;
const { Option } = Select;
const { Search } = Input;
let flag = "resourceName";
const SearchInput = props => {
    const { handleSearchValue, history } = props;
    // console.log(history)
    const [type, setType] = useState(props.data === "material" ? "software": "material");
    const [flag, setFlag] = useState('')
    useEffect(() => {
        setFlag("resourceName")
    }, [props.data])
    return(
        <div className="container">
            <InputGroup
                className="search"
                compact
            >
                <Select
                    defaultValue="resourceName"
                    onChange={value => setFlag(value) }
                >
                    <Option value="resourceName">
                        {type === "material" ? "资料名" : "软件名"}
                    </Option>
                    <Option value="userName">上传人</Option>
                </Select>
                <Search
                    placeholder="请输入搜索信息"
                    onSearch={(value,e) => handleSearchValue(
                        flag === "resourceName" ? {
                            page: 1,
                            type,
                            resourceName: value,
                            userName: ""
                        } : {
                            page: 1,
                            type,
                            resourceName: "",
                            userName: value
                        }
                    )
                    }
                    enterButton
                />
            </InputGroup>
        </div>
    )
};
export default withRouter(connect(
    state => ({

    }),
    dispatch => ({
        handleSearchValue(args){
            dispatch(resource.fetchSearchValue(args));
        }
    })
)(SearchInput));
