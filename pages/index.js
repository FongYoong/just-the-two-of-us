import { useState } from 'react'
import Head from 'next/head'
import { Box, Heading, Text, HStack, VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import TypeIt from "typeit-react";
import { Piano, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import { useAudioPlayer } from "react-use-audio-player"
import ReactHowler from 'react-howler'
import TextTransition, { presets } from "react-text-transition";
import { MotionBox, MotionButton } from '../components/MotionElements';
import Heart from '../components/Heart';

// Stages
// letter_closed -> open letter
// letter_opened -> read letter
// letter_end -> finish typing out text
// play_verse -> hide letter, show piano, play verse of Cant Take My Eyes of You
// bursting_hearts -> Click on hearts to reveal words: Will You Be My Valentine?
// accepted

const letterOpenDuration = 2.5;
const letterCloseDuration = 3;
const pianoHideDuration = 2;

export default function Home() {

  const [stage, setStage] = useState("letter_closed"); // letter_closed
  const [letterTextInstance, setLetterTextInstance] = useState(null);
  const [showLetter, setShowLetter] = useState(true); // true
  const [showPiano, setShowPiano] = useState(false); // false

  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('f5');
  const [highlightPianoKey, setHighlightPianoKey] = useState([]);
  const [versePart, setVersePart] = useState(0); // 0
  const [verseText, setVerseText] = useState(""); // ""

  const [questionIndex, setQuestionIndex] = useState(0); // 0

  const [openEnvelopePlaying, setOpenEnvelopePlaying] = useState(false);
  const [backgroundPlaying, setBackgroundPlaying] = useState(false);
  const [writingPlaying, setWritingPlaying] = useState(false);
  const [buildupPlaying, setBuildupPlaying] = useState(false);
  const [climaxPlaying, setClimaxPlaying] = useState(false);

  const { togglePlayPause } = useAudioPlayer({
    src: "/audio/cant_take_my_eyes_off_you_piano.mp3",
    format: "mp3",
    autoplay: false,
    //onend: () => console.log("sound has ended!")
  });

  const openLetter = () => {
    if (stage == "letter_closed") {
      setOpenEnvelopePlaying(true)
      setTimeout(() => {
        setOpenEnvelopePlaying(false)
      }, letterOpenDuration * 1000);
      setStage('letter_opened');
      setTimeout(() => {
        setWritingPlaying(true)
        setBackgroundPlaying(true)
        letterTextInstance.reset()
        letterTextInstance.type("Amongst the unfathomable hugeness of the universe,").break().pause(500)
        .type("where light is scarce,").break().pause(500)
        .type("lies the radiant beauty of your love.").pause(1200).break().break()
        .type("Ariana,").pause(500).break().pause(500)
        .type("Words cannot describe how wonderful you are to me. ").break().pause(500)
        .type("Your laughs and smiles. ").pause(500).type("Your dimples.").break().pause(500)
        .type("Your patience with my crappy jokes.").pause(1000).break().break()
        .type("You're more than a woman to me.").break().pause(500)
        .type("You are my paradise. ").pause(500).break().type("My partner in order and crime. ").pause(500).break().type("My forever. ")
        .exec(()=> {
          setWritingPlaying(false)
          setStage("letter_end")
        })
        .go();
      }, letterOpenDuration * 1000 + 1500);
    }
  }

  const closeLetter = () => {
    setBackgroundPlaying(false)
    setShowLetter(false)
    setShowPiano(true)
    setStage('play_verse')
    setTimeout(() => {
      togglePlayPause(); // start the song
      setTimeout(() => {
        togglePlayPause(); // pause the song after intro
        setHighlightPianoKey([{ key: '🖱️', midiNumber: MidiNumbers.fromNote('d4') }])
      }, 8000); // 8000
    }, letterCloseDuration * 1000);
  }

  const verseClick = () => {
    //// Remove this/////
    // setShowPiano(false)
    // setStage("bursting_hearts")
    //// Remove this/////

    if (versePart == 0) {
      // You're just too good to be true
      setVerseText("You're just too good to be true")
      togglePlayPause(); // resume
      setTimeout(() => {
        togglePlayPause(); // pause
        setHighlightPianoKey([{ key: '🖱️', midiNumber: MidiNumbers.fromNote('c4') }])
      }, 3500); // 3500
    }
    else if (versePart == 1) {
      // Can't take my eyes of you
      setVerseText("Can't take my eyes of you")
      togglePlayPause(); // resume
      setTimeout(() => {
        togglePlayPause(); // pause
        setHighlightPianoKey([{ key: '🖱️', midiNumber: MidiNumbers.fromNote('b3') }])
      }, 4700); // 4700
    }
    else if (versePart == 2) {
      // You'd be like heaven to touch
      setVerseText("You'd be like heaven to touch")
      togglePlayPause(); // resume
      setTimeout(() => {
        togglePlayPause(); // pause
        setHighlightPianoKey([{ key: '🖱️', midiNumber: MidiNumbers.fromNote('a3') }])
      }, 4500); // 4500
    }
    else if (versePart == 3) {
      // I wanna hold you so much
      setVerseText("I wanna hold you so much")
      togglePlayPause(); // resume
      setTimeout(() => {
        togglePlayPause(); // pause
        setHighlightPianoKey([{ key: '🖱️', midiNumber: MidiNumbers.fromNote('f3') }])
      }, 4000); // 4000
    }
    else if (versePart == 4) {
      // At long last love has arrived
      setVerseText("At long last love has arrived")
      togglePlayPause(); // resume
      setTimeout(() => {
        togglePlayPause(); // pause
        setHighlightPianoKey([{ key: '🖱️', midiNumber: MidiNumbers.fromNote('e3') }])
      }, 4000); // 4000
    }
    else if (versePart == 5) {
      // And I thank God I'm alive
      setVerseText("And I thank God I'm alive")
      togglePlayPause(); // resume
      setTimeout(() => {
        togglePlayPause(); // pause
        setHighlightPianoKey([{ key: '🖱️', midiNumber: MidiNumbers.fromNote('f4') }])
      }, 4000); // 4000
    }
    else if (versePart == 6) {
      // You're just too good to be true
      setVerseText("You're just too good to be true")
      togglePlayPause(); // resume
      setTimeout(() => {
        togglePlayPause(); // pause
        setHighlightPianoKey([{ key: '🖱️', midiNumber: MidiNumbers.fromNote('c4') }])
      }, 4500); // 4500
    }
    else if (versePart == 7) {
      // Can't take my eyes of you
      setVerseText("Can't take my eyes of you...")
      togglePlayPause(); // resume
      setTimeout(() => {
        togglePlayPause(); // pause
        setShowPiano(false)
        setStage("bursting_hearts")
        setBuildupPlaying(true)
      }, 5000); // 5000
    }
    setHighlightPianoKey([])
    setVersePart(versePart + 1)
  }
  
  const bubbleClick = () => {
    setQuestionIndex(questionIndex + 1)
  }

  const yesClick = () => {
    setBuildupPlaying(false)
    setClimaxPlaying(true)
    setQuestionIndex(0)
    setStage("accepted")
  }

  return (
    <div>
      <Head>
        <title>Just The Two of Us</title>
        <meta name="description" content="Just The Two of Us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ReactHowler
          src='/audio/open_envelope.mp3'
          playing={openEnvelopePlaying}
          loop={false}
        />
        <ReactHowler
          src='/audio/relax.mp3'
          volume='0.3'
          playing={backgroundPlaying}
          loop={true}
        />
        <ReactHowler
          src='/audio/writing.mp3'
          playing={writingPlaying}
          loop={true}
        />
        <ReactHowler
          src='/audio/cant_take_my_eyes_off_you_buildup.mp3'
          playing={buildupPlaying}
          loop={true}
        />
        <ReactHowler
          src='/audio/cant_take_my_eyes_off_you_climax.mp3'
          playing={climaxPlaying}
          loop={false}
        />
        <VStack align='center' justify='center' spacing='2em' w="100%" h='100%' p="1em" >
          {/* <MotionBox visibility='hidden' bg='white' borderRadius='0.5em' boxShadow="0px 2px 8px 0px rgba(0,0,0,0.75)"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 2px 20px 0px rgba(0,0,0,0.75)"
            }}
          >
            <Heading textAlign='center' m={4} color='black' fontSize="6xl" fontWeight="extrabold" fontFamily={`'Dosis', sans-serif`} >
              Just The Two of Us
            </Heading>
          </MotionBox> */}
          <Fade unmountOnExit right opposite when={showLetter}>
            <MotionBox mt='20vh' position='relative' w='42vw' h='40vh' bg='#fffef5' borderRadius='0.5em' boxShadow="0px 2px 8px 0px rgba(0,0,0,0.75)"
              whileHover={{
                boxShadow: "0px 2px 20px 0px rgba(0,0,0,0.75)"
              }}
              initial='getAttention'
              animate={stage == "letter_closed" ? 'getAttention' : (showLetter ? 'still' : 'hide')}
              variants={{
                getAttention: {
                  display: 'block',
                  scale: [1, 1.05, 1.03, 1],
                  rotate: [0, 5, -5, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 2.5,
                    delay: 1
                  }
                },
                still: {
                  scale: 1,
                  display: 'block',
                  rotate: 0,
                },
                hide: {
                  display: 'none',
                  transition: {
                    display: {
                      delay: 1.5
                    }
                  }
                }
              }}
              // animate={stage == "letter_closed" ? "closed" : "open"}
              // variants={{
              //   open: {rotateX: 180},
              //   closed: {rotateX: 0},
              // }}
              onClick={openLetter}
            >
              <MotionBox  position='absolute' m='1em' overflow='auto'
                initial='hide'
                animate={stage == "letter_closed" ? 'hide' : 'show'}
                variants={{
                  hide: {
                    zIndex: 1,
                    width:'39vw',
                    height: '30vh',
                    top:'0vh',
                    left:'0vw',
                  },
                  show: {
                    zIndex: [1, 1, 3],
                    width: ['39vw', '39vw', '39vw', '90vw'],
                    height: ['30vh', '30vh', '30vh', '70vh'],
                    top: ['0vh', '-30vh', '0vh'],
                    left: ['0vw', '0vw', '0vw', '-25vw'],
                    transition: {
                      delay: 1.5,
                      duration: letterOpenDuration,
                      times: [0, 0.3, 0.7, 1],
                      zIndex: {
                        delay: 2.5,
                      },
                    }
                  }
                }}
              >
                <Box bg='#fafafa' overflow='auto' w='100%' h='100%' >
                  <Text zIndex='1' position='absolute' left='12%' top='30px' w='85%' color='black' fontSize="2xl" fontWeight="extrabold" fontFamily={`'Indie Flower', cursive`} >
                    <TypeIt
                      options={{
                        loop: false,
                        speed: 50
                      }}
                      getBeforeInit={(instance) => {
                        setLetterTextInstance(instance);
                        return instance;
                      }}
                    >&nbsp;</TypeIt>
                  </Text>
                  <MotionButton
                    zIndex='1' position='absolute' bottom='1%' right='1%'
                    colorScheme='green' fontSize='3xl'
                    animate={stage==='letter_end' ? 'show' : 'hide'}
                    variants={{
                      show: {
                        scale:[1, 1.2, 1],
                        transition: {
                          repeat: Infinity,
                          duration: 1,
                        }
                      },
                      hide: {
                        scale: 0
                      }
                    }}
                    onClick={closeLetter}
                  >
                    Next
                  </MotionButton>
                  <Box position='absolute' top='35px' left='60px' right='0' bottom='30px'
                    bg='linear-gradient(transparent, transparent 2em, #91D1D3 2em)'
                    backgroundSize='2.2em 2.2em'
                  />
                  <Box position='absolute' top='0' left='-1px' h='100%' w='10%' background='radial-gradient(#575450 6px, transparent 7px) repeat-y' 
                    backgroundSize='2.2em 2.2em'
                    borderRight='3px solid #D44147'
                    boxSizing='border-box'
                  />
                </Box>
              </MotionBox>
              <Box position='absolute' top='0.5%' h='0.1em' w='100%' bg='black' />
              {/* <Box position='absolute' left='0' top='0.5%' transform='rotate(30deg)' transformOrigin='top left' h='0.2em' w='46%' bg='black' />
              <Box position='absolute' right='0' top='0.5%' transform='rotate(-30deg)' transformOrigin='top right' h='0.2em' w='46%' bg='black' />
              <Box position='absolute' left='39.5%' top='9.75vw' h='0.2em' w='21%' bg='black' /> */}
              <Box position='absolute' left='0' zIndex='1'
                borderTop='20vh solid transparent'
                borderLeft='16.8vw solid #fff8d9'
                borderBottom='20vh solid transparent'
                h='0' w='0'
              />
              <Box position='absolute' right='0' zIndex='1'
                borderTop='20vh solid transparent'
                borderRight='16.8vw solid #fff8d9'
                borderBottom='20vh solid transparent'
                h='0' w='0'
              />
              <Box position='absolute' bottom='0' zIndex='1'
                borderBottom='22vh solid #fff5c7'
                borderLeft='16.8vw solid transparent'
                borderRight='16.8vw solid transparent'
                h='0' w='100%'
              />
              <MotionBox
                position='absolute'
                style={{originY: 0}}
                whileHover={ stage == "letter_closed" ? {
                  rotateX:  30
                } : {}}
                animate={stage == "letter_closed" ? "closed" : "open"}
                variants={{
                  open: {
                    rotateX: 180,
                    zIndex: 0,
                    transition: {
                      rotateX: {
                        duration: 1,
                      },
                      zIndex: {
                        delay: 1.5,
                      },
                    }
                  },
                  closed: {
                    rotateX: 0,
                    zIndex: 2
                  },
                }}
                w='0' h='0'
                borderLeft="21vw solid transparent"
                borderRight="21vw solid transparent"
                borderTop="31vh solid black"
              >
                <Box
                  position='absolute'
                  left="-21vw"
                  bottom="1vh"
                  w='0' h='0'
                  borderLeft="21vw solid transparent"
                  borderRight="21vw solid transparent"
                  borderTop="30vh solid #fffbe3"
                />
                <Text w='10em' position='absolute' left='-20vh' bottom='15vh' transform='rotate(10deg)'
                  color='black' fontSize="2xl" fontWeight="extrabold" textAlign='center' fontFamily={`'Indie Flower', cursive`} >
                  For my boo<br /> {"<3"}
                </Text>

              </MotionBox>
            </MotionBox>
          </Fade>

          {/* Piano section */}
          <MotionBox
            pt='20vh'
            animate={showPiano ? 'show' : 'hide'}
            variants={{
              show:{
                scale: 1,
                display: 'block'
              },
              hide:{
                scale: 0,
                display: 'none',
                transition: {
                  duration: pianoHideDuration,
                  type: "tween",
                  display: {
                    delay: pianoHideDuration
                  }
                }
              },
            }}
          >
            <Text w='90vw' h='5em' color='black' textAlign='center' fontSize="2xl" fontWeight="extrabold" fontFamily={`'Indie Flower', cursive`} >
              <TextTransition
                style={{
                  display: 'table',
                  margin: '0 auto'
                }}
                text={verseText}
                springConfig={ presets.wobbly }
              />
            </Text>
          </MotionBox>

          <MotionBox
            position='relative' w='90vw' h='20em'
            initial="hide"
            animate={showPiano ? 'show' : 'hide'}
            variants={{
              show:{
                scale: 1,
                display: 'block',
                transition: {
                  delay: 1.5,
                  duration: letterCloseDuration - 1.5,
                  type: "tween",
                }
              },
              hide: {
                scale: 0,
                display: 'none',
                transition: {
                  duration: pianoHideDuration,
                  type: "tween",
                  display: {
                    delay: pianoHideDuration
                  }
                }
              }
            }}
            >
            <Piano
              noteRange={{ first: firstNote, last: lastNote }}
              keyboardShortcuts={highlightPianoKey}
              renderNoteLabel={({ keyboardShortcut}) =>
                keyboardShortcut &&
                <MotionBox
                  w='100%'
                  //bg='rgba(255,255,255,0.5)'
                  //bg='linear-gradient(90deg, rgba(203,230,255,1) 0%, rgba(255,255,255,1) 51%, rgba(187,244,255,1) 100%)'
                  //borderRadius='4em' border='2px solid #91efff'
                  animate={{
                    scale: [0.7, 0.9, 0.7]
                  }}
                  transition={{
                    repeat: Infinity,
                    times: [0, 0.5, 1],
                    duration: 2,
                  }}
                  onClick={verseClick}
                >
                  <svg viewBox="0 0 32 29.6"
                    style={{
                      fill: 'red',
                      position: 'relative',
                      width: '100%'
                    }}
                  >
                    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                    c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                  </svg>
                  {/* <Text position='absolute' left='0' top='12.5%'
                    color='black' textAlign='center' fontSize="md" fontWeight="extrabold" p='0.5em' fontFamily={`'Dosis', sans-serif`} >
                    {keyboardShortcut}
                  </Text> */}
                </MotionBox>
              }
            />
          </MotionBox>

          {/* Heart section */}

          <MotionBox
            position='absolute' top='0' left='0'
            w='100%' h='100%'
            initial='hide'
            animate={stage == 'bursting_hearts' ? 'show' : 'hide'}
            variants={{
              show:{
                scale: 1,
                transition: {
                  delay: pianoHideDuration,
                  duration: 1,
                  type: "tween",
                }
              },
              hide:{
                scale: 0
              },
            }}
          >
            <Heart position='absolute' top='20vh' left='10vw' w='5em' onClick={bubbleClick} hideOnClick />
            <Heart position='absolute' top='30vh' right='10vw' w='5em' onClick={bubbleClick} hideOnClick />
            <Heart position='absolute' top='20vh' left='45vw' w='5em' onClick={bubbleClick} hideOnClick />
            <Heart position='absolute' top='50vh' left='60vw' w='5em' onClick={bubbleClick} hideOnClick />
            <Heart position='absolute' top='70vh' left='35vw' w='5em' onClick={bubbleClick} hideOnClick />
          </MotionBox>
          <MotionBox borderRadius='0.5em' boxShadow={questionIndex >= 5 ? "0px 2px 8px 0px rgba(0,0,0,0.75)" : ""}
            whileHover={questionIndex >= 5 ? {
              scale: 1.05,
              boxShadow: "0px 2px 20px 0px rgba(0,0,0,0.75)"
            } : {}} 
            initial='hide'
            animate={questionIndex >= 1 ? (questionIndex >= 5 ? 'showFull' : 'show') : 'hide' }
            variants={{
              showFull: {
                display: 'block',
                backgroundColor: 'rgba(255, 255, 255, 255)',
                opacity: 1,
                transition: {
                  duration: 1.5
                }
              },
              show: {
                display: 'block',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                opacity: 1
              },
              hide: {
                display: 'none',
                opacity: 0
              }
            }}
          >
            <HStack m={4} aling='center' justify='center' wrap='wrap' >
              <Flip left when={questionIndex >= 1} >
                <Heading color='black' fontSize="6xl" fontWeight="extrabold" fontFamily={`'Dosis', sans-serif`} >
                  Will
                </Heading>
              </Flip>
              <Flip left when={questionIndex >= 2} >
                <Heading color='black' fontSize="6xl" fontWeight="extrabold" fontFamily={`'Dosis', sans-serif`} >
                  You
                </Heading>
              </Flip>
              <Flip left when={questionIndex >= 3} >
                <Heading color='black' fontSize="6xl" fontWeight="extrabold" fontFamily={`'Dosis', sans-serif`} >
                  Be
                </Heading>
              </Flip>
              <Flip left when={questionIndex >= 4} >
                <Heading color='black' fontSize="6xl" fontWeight="extrabold" fontFamily={`'Dosis', sans-serif`} >
                  My
                </Heading>
              </Flip>
              <Flip left when={questionIndex >= 5} >
                <Heading color='black' fontSize="6xl" fontWeight="extrabold" fontFamily={`'Dosis', sans-serif`} >
                  Valentine?
                </Heading>
              </Flip>
            </HStack>
          </MotionBox>
          <Fade bottom when={questionIndex >= 5} >
            <HStack spacing='2em' >
              <MotionButton
                colorScheme='green'
                fontSize='3xl'
                whileHover={{
                  scale: 1.6,
                }}
                whileTap={{
                  scale: 0.9
                }}
                onClick={yesClick}
              >
                YESH
              </MotionButton>
              <Popover>
                <PopoverTrigger>
                  <MotionButton
                    colorScheme='red'
                    fontSize='3xl'
                    whileHover={{
                      scale: 1.6,
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                  >
                    Nuh Uh
                  </MotionButton>
                </PopoverTrigger>
                <PopoverContent >
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader fontWeight="extrabold" textColor='red' >Critical Error!</PopoverHeader>
                  <PopoverBody>Huh, strange. The reject button isn&apos;t working!</PopoverBody>
                </PopoverContent>
              </Popover>
            </HStack>
          </Fade>
          <Fade bottom when={stage == "accepted"} >
            <MotionBox
              pt='10vh'
              initial='getAttention'
                animate={stage == "accepted" ? 'getAttention' : 'hide'}
                variants={{
                  getAttention: {
                    display: 'block',
                    scale: [1, 1.05, 1.03, 1],
                    rotate: [0, 5, -5, 0],
                    transition: {
                      repeat: Infinity,
                      duration: 2.5,
                    }
                  },
                  hide: {
                    display: 'none',
                  }
                }}
            >
              <VStack center='center' justify='center' >
                <Heading color='black' fontSize="6xl" fontWeight="extrabold" fontFamily={`'Dosis', sans-serif`} >
                  Happy Valentine&apos;s, my love
                </Heading>
                <Box w='20vw'>
                  <div className="diamond">
                    <div className="dia">
                      <img src="/images/selfie.jpg" alt="" />
                    </div>
                  </div>
                </Box>
              </VStack>
            </MotionBox>
          </Fade>
        </VStack>
      </main>

      <footer>
      </footer>
    </div>
  )
}
