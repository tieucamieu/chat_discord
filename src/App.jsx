import axios from "axios"
import { useEffect, useRef, useState } from "react"
import './App.css'
function App() {
  const inputRef = useRef()
  const [calling, setCalling] = useState(false)
  const channelIdList = [
    {
      title: "MD1-HTML,CSS,JS",
      id: "1104260605856186368"
    },
    {
      title: "MD2-ReactJS",
      id: "1104260963793911839"
    },
    {
      title: "MD3-NodeJs",
      id: "1099592596910776330"
    },
    {
      title: "MD4-TypeScript",
      id: "1106803127509860472"
    },
    {
      title: "MD5-NestJS",
      id: "1106803198334873611"
    },

  ]

  const [channelSelect, setChannelSelect] = useState("")

  const [chats, setChats] = useState([])

  async function getChats(channelId) {
    let apiKey = "ODM1MDk2ODAwMjA5MDEwNjk5.GS80JE.ZwQn2yte1LseJHNyDU8SBLGh8U5VTCqLn5hwzY"
    let urlApi = `https://discord.com/api/v9/channels/${channelId}/messages?limit=10`
    if (calling) return
    setCalling(true)
    axios.get(urlApi, {
      headers: {
        Authorization: apiKey
      }
    })
      .then(res => {
        setChats(res.data)
        setCalling(false)
      })

      .catch(err => {
        console.log("err", err)
        setCalling(false)
      })
  }

  async function handleSendMessage(channelId, content) {
    let apiKey = "ODM1MDk2ODAwMjA5MDEwNjk5.GS80JE.ZwQn2yte1LseJHNyDU8SBLGh8U5VTCqLn5hwzY"
    let urlApi = `https://discord.com/api/v9/channels/${channelId}/messages`
    axios.post(urlApi, {
      content
    }, {
      headers: {
        Authorization: apiKey
      }
    }).then(res => {
      getChats(channelId)
    })
  }
  
  useEffect(() => {
    getChats(String(channelSelect))
  }, [channelSelect])

  useEffect(() => {
    setInterval(() => {
      let apiKey = "ODM1MDk2ODAwMjA5MDEwNjk5.GS80JE.ZwQn2yte1LseJHNyDU8SBLGh8U5VTCqLn5hwzY"
      let urlApi = `https://discord.com/api/v9/channels/${channelSelect}/messages?limit=10`
      axios.get(urlApi, {
        headers: {
          Authorization: apiKey
        }
      })
        .then(res => {
          setChats(res.data)
        })
    }, 1000)
  }, [channelSelect])
  return (
    <div>
      <h1>App Discord Chat</h1>
      <div>
        <select value={channelSelect} onChange={(e) => {
          setChannelSelect(e.target.value)
        }}>
          <option value={""}>Chọn kênh</option>
          {
            channelIdList.map(channel => (
              <option key={channel.id} value={channel.id}>{channel.title}</option>
            ))
          }

        </select>
      </div>
      <div>
        <ul>
          {
            chats.slice().reverse().map((chat, index) => {
              return (<li key={chat.id}>
                {chat.author.global_name}: {chat.content}
              </li>)
            })
          }
        </ul>
      </div>
      <div>
        <input ref={inputRef} type="text" /><button onClick={() => {
          handleSendMessage(channelSelect, inputRef.current.value);
          inputRef.current.value = ""
        }}>Gửi</button>
      </div>
      {
        calling && <div id="calling_over"></div>
      }
    </div>
  )
}

export default App
