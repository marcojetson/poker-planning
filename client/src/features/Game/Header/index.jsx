import React from 'react';
import Button from "../../../components/Button";
import * as PropTypes from 'prop-types';

const Header = ({ title, showEndRound, onEndRound }) => (
    <>
        <h1>{title}</h1>
        {showEndRound && <Button type="button" onClick={onEndRound}>End round</Button>}
    </>
);

Header.defaultProps = {
    showEndRound: false,
};

export default Header;
