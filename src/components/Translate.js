import React, { useState } from "react";
import './../App.css';
import { Form, Button, Icon } from 'semantic-ui-react'

const languageOptions = [
    { key: 'en', text: 'English', value: 'english' },
    { key: 'hi', text: 'Hindi', value: 'hindi' },
    { key: 'ur', text: 'Arabic', value: 'arabic' },
]

export default function Translate() {
    const [inputText, setInputText] = useState('');
    const [resultText, setResultText] = useState('');
    const translateText = () => {
        setResultText(inputText);
    }

    return (
        <div>
            <div className="app-header">
                <h2>React Language Translator</h2>
            </div>
            <div className="app-body ui container">
                <Form>
                    <Form.TextArea onChange={(e) => setInputText(e.target.value)} placeholder='Type text to translate...' />
                    <Form.Select
                        fluid
                        options={languageOptions}
                        placeholder='Select Language'
                    />
                    <Form.TextArea placeholder='Translated Text...' value={resultText} />
                    <Button animated positive floated='right' onClick={translateText}>
                        <Button.Content visible>Translate</Button.Content>
                        <Button.Content hidden>
                            <Icon name='translate' />
                        </Button.Content>
                    </Button>
                </Form>
            </div>
        </div>
    )
}