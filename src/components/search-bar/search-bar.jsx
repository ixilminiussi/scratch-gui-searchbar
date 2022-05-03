import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { tag_dictionary } from '../../lib/search-structures.js'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import styles from './search-bar.css';

const SearchBarComponent = props => {
    const {
        query = '',
        onInput,
        tags = ['#all'],
        onTags
    } = props;

    return (
        <div className={classNames(styles.searchcontainer)}>
            <Autocomplete
                multiple
                autoComplete
                autoHighlight
                id="size-small-outlined-multi"
                size="small"
                clearOnBlur={false}
                ListboxProps={{ style: { maxHeight: '5rem' }}}
                options={Object.keys(tag_dictionary)}
                onChange={(event, value) => onTags(value)}
                renderInput={(params) => (
                    <TextField {...params} 
                        autoFocus
                        className={classNames(styles.searchinput)}
                        label='Search Blocks'
                        onChange={onInput}
                        variant='standard'
                    />)}
            />
        </div>
    );
};

SearchBarComponent.propTypes = {
    query: PropTypes.string,
    onInput: PropTypes.func.isRequired,
    tags: PropTypes.array,
    onTags: PropTypes.func.isRequired
};

export default SearchBarComponent;
