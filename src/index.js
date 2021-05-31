import React,{Component,useState,useEffect,createContext,useContext,useReducer,useMemo,useRef,useCallback } from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import { Color } from './color'; 
import {ColorContext,UPDATE_COLOR} from './color'
import Shop from './pages/shop'
import './index.css'

class ExampleOld extends Component {
    constructor(props){
        super(props)
        this.state = {count:0}
    }
    componentDidMount(){
        console.log(`ComponentDidMount=>You clicked ${this.state.count} times`)
    }
    componentDidUpdate(){
        console.log(`componentDidUpdate=>You clicked ${this.state.count} times`)
    }
    render(){
        return (<div>
            <p>you clicked {this.state.count} times</p>
            <button onClick={this.addCount.bind(this)}>click me</button>
        </div>)
    }
    addCount(e){
        this.setState({
            count:this.state.count + 1
        })
    }
}

function ExampleNew () {
    const [count,setCount] = useState(0)
    useEffect(() => {
        console.log(`useEffect=>you clicked ${count} times`)
        return () => {console.log('===================')}
    },[count])
    return (<div>
        <p>you clicked {count} times</p>
        <button onClick={() => {setCount(count + 1)}}>click me</button>
        <Router>
            <ul>
                <li>
                    <Link to="/">首页</Link>
                </li>
                <li>
                    <Link to="/list/">列表</Link>
                </li>
            </ul>
            <Route path="/" exact component={Index}></Route>
            <Route path="/list/" component={List}></Route>
        </Router>
    </div>)
}

function Index() {
    useEffect(() => {
        console.log('here is Index')
        return () => {console.log('goodbye Index')}
    },[])
    return <p>index</p>
}

function List() {
    useEffect(() => {
        console.log('here is List')
        return () => {console.log('goodsbye List')}
    },[])
    return <p>list</p>
}


const CountCountext = createContext()

function ExampleContext(){
    const [count,setCount] = useState(0)
    return (
        <div>
            <CountCountext.Provider value={count}>
            <Counter />
            </CountCountext.Provider>
            <button onClick={() => {setCount(count + 1)}}>click me</button>
            
        </div>
    )
}


function Counter(){
    const count = useContext(CountCountext)
    return <h2>{count}</h2>
}

function ExampleReducer(){
    const [count,dispatch] = useReducer((state,action) => {
        switch(action){
            case 'add':
                return state + 1
            case 'sub':
                return state - 1
            default:
                return state
        }
    },0)
    return (
        <div>
            <h2>现在的分数是{count}</h2>
            <button onClick={() => dispatch('add')}>Increment</button>
            <button onClick={() => dispatch('sub')}>Decrement</button>
        </div>
    )
}


function ShowArea(){
    const {color} = useContext(ColorContext)
    return (<div style={{color}}>字体颜色为{color}</div>)
}

function Buttons(){
    const {dispatch} = useContext(ColorContext)
    return (
        <div>
            <button onClick={() => {dispatch({type:UPDATE_COLOR,color:"red"})}}>红色</button>
            <button onClick={() => {dispatch({type:UPDATE_COLOR,color:"yellow"})}}>黄色</button>
        </div>
    )
}



function ExampleRedux(){
    return (
        <Color>
            <ShowArea />
            <Buttons />
        </Color>
    )
}

function ExampleMemo(){
    const [xiaohong , setXiaohong] = useState('小红待客状态')
    const [zhiling , setZhiling] = useState('志玲待客状态')
    return (
        <>
            <button onClick={()=>{setXiaohong(new Date().getTime())}}>小红</button>
            <button onClick={()=>{setZhiling(new Date().getTime()+',志玲向我们走来了')}}>志玲</button>
            <ChildComponent name={xiaohong}>{zhiling}</ChildComponent>
        </>
    )
}

function ChildComponent({name,children}){
    function changeXiaohong(name){
        console.log('她来了，她来了。小红向我们走来了')
        return name+',小红向我们走来了'
    }

    const actionXiaohong = useMemo(()=>changeXiaohong(name),[name]) 
    return (
        <>
            <div>{actionXiaohong}</div>
            <div>{children}</div>
        </>
    )
}

function ExampleRef(){
    const inputEl = useRef(null)
    const onButtonClick = () => {
        inputEl.current.value = "Here's johnny"
    }
    const [text,setText] = useState('johnny')
    const textRef = useRef()

    useEffect(() => {
        textRef.current = text
    })
    return (
        <>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>在input上展示文字</button>
            <br/>
            <br/>
            <input value={text} onChange={(e) => {setText(e.target.value)}} />
        </>
    )
}

function useWinSize(){
    const [ size , setSize] = useState({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
    })

    const onResize = useCallback(()=>{
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    },[]) 
    useEffect(()=>{
        window.addEventListener('resize',onResize)
        return ()=>{
            window.removeEventListener('resize',onResize)
        }
    },[])

    return size;

}

function ExampleCallback(){
    const size = useWinSize()
    if(size.height>400){
        throw Error('xx')
    }
    return (
        <div>页面Size:{size.width}x{size.height}</div>
    )
}



class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // 更新 state 使下一次渲染能够显示降级后的 UI
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // 你同样可以将错误日志上报给服务器
      console.log(error,'error')
      console.log(errorInfo,'errorInfo')
    }
  
    render() {
      if (this.state.hasError) {
        // 你可以自定义降级后的 UI 并渲染
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
}



function App () {
    return (<div>
        <div className="title">class</div>
        <ExampleOld />
        <div className="title">hooks</div>
        <ExampleNew/>
        <div className="title">useContext</div>
        <ExampleContext/>
        <div className="title">useReducer</div>
        <ExampleReducer/>
        <div className="title">fakeRedux</div>
        <ExampleRedux/>
        <div className="title">fakeRedux2</div>
        <Shop/>
        <div className="title">useMemo</div>
        <ExampleMemo/>
        <div className="title">useRef</div>
        <ExampleRef/>
        <div className="title">useCallback</div>
        <ErrorBoundary><ExampleCallback/></ErrorBoundary>
        
    </div>)
}
ReactDOM.render(<App />,document.getElementById('root'))