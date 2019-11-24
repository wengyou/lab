import React, {useRef, useState} from "react";
import { connect } from "react-redux";
import "../static/style/search.scss";
import { Input, Select } from 'antd';

const InputGroup = Input.Group;
const { Option } = Select;
const { Search } = Input;
const SearchInput = props => {
    const { handleSearch } = props;

    return(
        <div className="container">
            <InputGroup
                className="search"
                compact
            >
                <Select defaultValue="Sign Up">
                    <Option value="Sign Up">资料名</Option>
                    <Option value="Sign In">上传人</Option>
                </Select>
                <Search
                    placeholder="请输入搜索信息"
                    onSearch={value => handleSearch(value)}
                    enterButton
                />
            </InputGroup>
        </div>
    )
};
export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(SearchInput);
