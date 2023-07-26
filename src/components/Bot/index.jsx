import { useEffect, useState } from "react";
import "./style.css"
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit';
import { useNavigate } from "react-router-dom";
import sectionHandler  from "../../common/sectionHandler";
import isQuestion from "./Func/QuestionChecker";
import AskBotName from "./Func/AskBotName";
import GreetingIdentify from "./Func/GreetingIdentify";
import {GreetingReplay, AskNameReplay} from "./Data/AnswerData";
import OpenSection from "./Func/OpenSection";
import CheckingFunc from "./Func/CheckingFunc";
import { askBotName } from "./Func/ListeningIdentify";

function Bot() {
  const navigate = useNavigate()
    const [listeningValue, setListeningValue] = useState(false)
    const [botText, setBotText] = useState("Start")
    const [listenValue, setListenValue] = useState('');
    const { listen, stop } = useSpeechRecognition({
      onResult: (result) => {
        setListenValue(result);
        nowSpeak(result)
      },
    });

    const { speak, voices, speaking } = useSpeechSynthesis();
    console.log(askBotName("what is your name"))
    /* 
      NOTE: 
      redirect link

        setTimeout(() => {
          navigate("/about")
        }, 1000);

      change section

        setTimeout(() => {
          sectionHandler("portfolio")
        }, 1000);
    */
      
        
    let timeOut;
    const nowSpeak = (listenText) => {
      const textListening = listenText
      clearTimeout(timeOut)

      timeOut = setTimeout(() => {
        if(textListening !== ""){
          setBotText("Speaking")
          stop()
          if(isQuestion(textListening)){
            if(AskBotName(textListening)){
              speak({ text: AskNameReplay(), voice:voices[5] })
            }
          }else{
            if(GreetingIdentify(textListening)){
              speak({ text: GreetingReplay(), voice:voices[5] })
            }else if(OpenSection(textListening).match){
              speak({ text: "going", voice:voices[5] })
              sectionHandler(OpenSection(textListening).section)
            }else{
              speak({ text: "I don't understand", voice:voices[5] })
            }
          }
        }else{
          speak({ text: "Speak some thing", voice:voices[5] })
        }
      }, 1000);
    }


    useEffect(() => {
      if(listeningValue){
        if(speaking === false){
          setBotText("Listening")
          listen()
        }
      }
    }, [speaking])










    // Test platfrom













  return (
    <div className="botContainer">
      <textarea
        value={listenValue}
        onChange={(event) => setListenValue(event.target.value)}
      />
      <button onClick={() => {
        setListeningValue(!listeningValue)
        if(!listeningValue){
          listen()
        }else{
          stop()
        }
        setBotText("Listening")
        }}>{botText}</button>
    </div>
  )
}

export default Bot