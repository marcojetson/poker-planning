import React, { useState } from 'react';
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const RoundForm = ({ onSubmit }) => {
    const [topic, setTopic] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({ topic });
    }

    const handleTopicChange = (e) => {
        setTopic(e.currentTarget.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input placeholder="Enter topic" value={topic} onChange={handleTopicChange} />
            <Button type="submit">Start round</Button>
        </form>
    );
}

export default RoundForm;
