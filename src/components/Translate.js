import React, { useEffect, useState } from "react";
import './../App.css';
import { Form, Button, Icon } from 'semantic-ui-react'
import axios from "axios";


export default function Translate() {
    const [inputText, setInputText] = useState('');
    const [resultText, setResultText] = useState('');
    const [languageKey, setLanguageKey] = useState('');
    const [languageOptions, setLanguageOptions] = useState([]);

    useEffect(() => {
        axios.get('https://libretranslate.de/languages').then((response) => {
            const languages = response.data;
            setLanguages(languages);
        });
    }, [])

    const setLanguages = (languages) => {
        let temp = [];
        languages.map((language) => {
            temp.push({
                key: language.code,
                text: language.name,
                value: language.code
            });
        });
        setLanguageOptions(temp);
    }

    const selectedLanguagesKey = (e, { value }) => {
        setLanguageKey(value);
    }

    const translateText = (source) => {
        let data = {
            q: inputText !== '' ? inputText : ' ',
            source: source,
            target: languageKey
        };
        axios.post('https://libretranslate.de/translate', data).then((response) => {
            setResultText(response.data.translatedText);
        }).catch((err) => {
            console.log(err);
        })
    }

    const detectLanguage = () => {
        const data = { q: inputText !== '' ? inputText : ' ' };
        axios.post('https://libretranslate.de/detect', data).then((response) => {
            translateText(response.data[0].language);
        });
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
                        onChange={selectedLanguagesKey}
                    />
                    <Form.TextArea placeholder='Translated Text...' value={resultText} disabled />
                    <Button animated positive floated='right' onClick={detectLanguage}>
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