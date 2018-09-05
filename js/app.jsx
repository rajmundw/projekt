import React from 'react';
import ReactDOM from 'react-dom';
document.addEventListener('DOMContentLoaded', function() {
    let counter =0
    let arrayElements = [];
    let couter=0
    let majorArr=[]
    let likeArr=[]
    let dataArr=[]
    let favouriteArr=[]
    let historyArr=[]
    let a=''
    let b=''
    let c=''
    let d=''

    class Sort extends React.Component{
        constructor(props){
            super(props)
            this.state={
                likesArr:''
            }
        }



        clickDataArray=()=>{
            console.log('clik1')
            this.props.clickDataArray()
        }
        clickLikeArray=()=>{
            console.log('clik2')
            this.props.clickLikeArray()
        }
        clikeFavouriteArray=()=>{
            this.props.clikeFavouriteArray()
        }

        render(){
            return(
                <div style={{width:'1000px'}}>
                    <p>Wybierz sposób sortowania || aby dodać do ulibionych klikij dwa razy</p>
                    <div style={{display:this.props.displayLike}}>Sortowane wg ilosci lajków</div>
                    <div style={{display:this.props.displayData}}>Sortowane wg daty utworzenia</div>
                    <div style={{display:this.props.displayFavourite}}> Plubione zadjęcia</div>
                    <button onClick={this.clickDataArray}>Data Utworzenia</button>
                    <button onClick={this.clickLikeArray}>Ilość polubień</button>
                    <button onClick={this.clikeFavouriteArray} >Ulubione</button>
                </div>
            )
        }
    }


    class Input extends React.Component{
        constructor(props){
            super(props)
            this.state={
                currentValue:'cat',
                keyWord:'',
                elementsArray:[],
                categoriesList:[],

            }
        }


        changeValue=(e)=>{

           this.setState({
                currentValue:e.target.value
            })
            this.state.currentValue = e.target.value


        }

    categoryClick = () => {
            this.props.stateNewKeyWord(this.state.currentValue);

            this.props.categorylistonclikc()

        }







        render(){
            return(
                <div>

                    <input placeholder="Wypisz kluczowe słowo" onChange={this.changeValue} value={this.state.currentValue}/>
                    <button onClick={this.categoryClick}>Szukaj</button>

                </div>
            )}
    }










    class List extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                keyWordLive: '',
                keyWord: 'dog',
                ansewerArray: [],
                answerFullArray: [],
                categoriesList: ['wybierz kategorie'],
                likeArray: [],
                displayMajor: 'block',
                displayLike: 'none',
                displayData: 'none',
                displayFavourite: 'none',
                displayMistake: 'none',
                likeList: [],
                likeValue: false,
                likeClass: '',
                historyArray:[],
                majorArray:[],
                dataArray:[],
                likesArray:[],
                favouriteArray:[],
                a:'',
                b:'',
                c:'',
                d:'',
                displaydiv:'block',
                displaydiv2:'none',
                historyKey:'',
                aa:'',
                bb:'',


            }

        }


        arrayPattern = () => {
            let newArr = this.state.ansewerArray.map(a => {
                return [a.urls, a.likes, a.created_at]
            })
            console.log('answerArr',this.state.ansewerArray)
            newArr = newArr.map(a => {
                counter = counter + 1
                let b = a[2].substr(0, 10)
                b = b.replace('-', '')
                b = b.replace('-', '')
                return <div onDoubleClick={this.likeClick} data-c='foto' data-like="false" data-b={`${a[0].thumb}`}
                            data-a={`${counter}`} id={`${a[1]}`} data={`${b}`} className={this.state.likeClass} style={{
                    float: 'left',
                    backgroundImage: `url("${a[0].thumb}")`,
                    backgroundSize: 'cover',
                    width: '200px',
                    height: '200px'
                }}></div>
            })
            this.setState({
                answerFullArray: newArr
            })
            this.state.answerFullArray=newArr


        }

        stateNewKeyWord = (newKeyWord) => {
            /*this.setState({
                keyWord: newKeyWord
            })*/
            this.state.keyWord=newKeyWord
            console.log(this.state.keyWord)
        }

        likeClick = (e) => {
            if (e.target.dataset.like == 'false') {


                let a = e.target.dataset.a
                let c = e.target.dataset.b
                let array = [a, c]
                let b = document.querySelectorAll(`[data-a="${a}"`)
                b.forEach(a => {
                    a.className = 'like'
                    a.dataset.like = 'true'
                })
                let newArr = this.state.likeArray.slice()
                newArr.push(array)
                this.setState({
                    likeArray: newArr

                })
            } else {

                let a = e.target.dataset.a
                let b = document.querySelectorAll(`[data-a="${a}"`)
                b.forEach(a => {
                    a.className = ''
                    a.dataset.like = 'false'
                })
                let newArr = this.state.likeArray.filter((item) => {
                    return item[1] !== e.target.dataset.b
                })
                this.setState({
                    likeArray: newArr

                })

            }
        }
        likeClick2 = (e) => {
            let a = e.target.dataset.a

            let b = []
            b = document.querySelectorAll(`[data-a="${a}"`)
        /*    console.log(b)*/

            b.forEach(a => {
/*
                console.log(a)
*/
                a.className = ''
            })
            let newArr = this.state.likeArray.filter((item) => {
                return item[1] !== e.target.dataset.b
            })
            this.setState({
                likeArray: newArr

            })

            b[b.length - 1].className = 'like'
        }


        majorArray = () => {
            let newArr = this.state.answerFullArray.map(a => {
                return a
            })
            console.log('major',majorArr)
                majorArr=<div data-type="major" style={{display: this.state.displayMajor}}>{newArr}</div>
            return majorArr

        }


        likeArray = () => {
            let newArr = this.state.answerFullArray.slice()
            newArr = newArr.sort((a, b) => {

                return b.props.id - a.props.id
            })
            likeArr=<div data-type="like" style={{display: this.state.displayLike}}>{newArr}</div>
            return likeArr
        }


        dataArray = () => {
            let newArr = this.state.answerFullArray.slice()
            newArr = newArr.sort((a, b) => {

                return Number(b.props.data) - Number(a.props.data)
            })
            dataArr=<div data-type="data" style={{display: this.state.displayData}}>{newArr}</div>

            return dataArr
        }
        favouriteArray = () => {
            let newArr = this.state.likeArray.slice()
            newArr = newArr.map(a => {
                return <div data-c='likefoto' data-b={`${a[1]}`} data-a={`${a[0]}`} onDoubleClick={this.likeClick2}
                            className='like' style={{
                    float: 'left',
                    backgroundImage: `url("${a[1]}")`,
                    backgroundSize: 'cover',
                    width: '200px',
                    height: '200px'
                }}></div>
            })
            favouriteArr=<div data-type="favourite" className='favourites' style={{display: this.state.displayFavourite}}>{newArr}</div>
            return favouriteArr
        }

        categoryMistake = () => {
            this.setState({
                displayMistake: 'block'
            })
        }

        categoryClick2 = () => {
            this.setState({
                displayMistake: 'none'
            })
        }

        clickMajorArray = () => {
            this.setState({
                displayMajor: 'block',
                displayLike: 'none',
                displayData: 'none',
                displayFavourite: 'none',
            })
        }


        clickLikeArray = () => {
            this.setState({
                displayMajor: 'none',
                displayLike: 'block',
                displayData: 'none',
                displayFavourite: 'none',
            })
        }


        clickDataArray = () => {
            this.setState({
                displayMajor: 'none',
                displayLike: 'none',
                displayData: 'block',
                displayFavourite: 'none',
            })
        }
        clikeFavouriteArray = () => {
            this.setState({
                displayMajor: 'none',
                displayLike: 'none',
                displayData: 'none',
                displayFavourite: 'block',
            })
        }



        newFetch = () => {
            const APP_ACCESS_KEY = 'cc4cb6824310e2d3a57aa7b814eeb94fe042ded52d96713010c3c0052a3d2dc2';
            const answer = fetch(`https://api.unsplash.com/search/photos?query=${this.state.keyWord}&per_page=20&client_id=${APP_ACCESS_KEY}`)
                .then(resp => resp.json())
                .then(resp => {
                    this.setState({
                        ansewerArray: resp.results
                    })
                    this.state.ansewerArray=resp.results

                    this.arrayPattern()



                    console.log('historyArray',this.state.historyArray)
                })
                .catch(err => console.log(err))

        }



        clickDelateLike = () => {
            let div = document.querySelectorAll('[data-c="likefoto"]')

                div.forEach(a => {
                a.parentElement.removeChild(a)
                })
                let a = document.querySelectorAll('.like')
                a.forEach(a => {
                    a.className = ''
                    a.dataset.like='false'
                })
        }


        category = () => {
            let newArr = this.state.categoriesList.slice()
            newArr = newArr.map(a => {
                return <option>{a}</option>
            })
            return <select onChange={this.choiceHistory}>{newArr}</select>
        }
        choiceHistory=(e)=>{
            this.setState({
                historyKey:e.target.value
            })
            {this.aa()}
            {this.bb()}
            {this.cc()}
            {this.dd()}
            this.state.historyKey=e.target.value
            console.log('choice',e.target.value)
            console.log('choice',this.state.historyKey)
            this.state.displayMistake='none'
            let a=document.querySelector('.new')
            this.setState({
                displaydiv:'none',
                displaydiv2:'block'
            })
this.backHistory()
    }



        backHistory =()=>{
            let a =document.querySelector('select')
            a.value='wybierz kategorie'
        }



        categorylistonclikc=()=>{
        if (this.state.categoriesList.length == 1) {
             let newArr = this.state.categoriesList.slice()
            newArr.push(this.state.keyWord)
            this.setState({
                          categoriesList: newArr,
                displaydiv2:'none',
                displaydiv:'block'
            })
            this.clickDelateLike()
            this.newFetch()
            this.clickMajorArray()
            this.arrayPattern()
            this.categoryClick2()
            this.backHistory()


                }else
             {

        let newArr = this.state.categoriesList.slice()
        let counter=0;
        newArr.forEach(a => {
            if (a == this.state.keyWord) {
                return counter=counter+1
                }})
            if(counter==0) {
                let newArr = this.state.categoriesList.slice()
                newArr.push(this.state.keyWord)
                this.setState({
                    categoriesList: newArr,
                    displaydiv2:'none',
                    displaydiv:'block'

                })
                this.clickDelateLike()
                this.newFetch()
                this.clickMajorArray()
                this.arrayPattern()
                this.categoryClick2()
                this.backHistory()

            }else {
                this.categoryMistake()
            }
        }

    }

    aa=()=>{
            let div=''
        let newArr=[]

            this.state.historyArray.forEach((a,b)=> {
                if (a[0] == this.state.historyKey) {

                    let newArr2=[]

                    for (let i = 0; i <a[1].length ; i++) {
                      newArr2[i]=a[1][i]

                    }
                    console.log['ddd',newArr2]
                    newArr=newArr2.map(c=>{

                        return <div  data-c={c[0]}
                                    data-like={c[1]}
                                    data-b={c[2]}
                                    data-a={c[3]}
                                    id={c[4]}
                                    data={c[5]}
                                    className={c[6]}
                                    style={{

                            float: 'left',
                            backgroundImage: `url("${c[2]}")`,
                            backgroundSize: 'cover',
                            width: '200px',
                            height: '200px'
                        }}></div>
                    })
                    console.log('aaArray',newArr)

                }

            })

        return <div  style={{display: this.state.displayMajor}}>{newArr}</div>

    }

    bb=()=>{
        let div=''
        let newArr=[]
        this.state.historyArray.forEach((a,b)=> {
            if (a[0] == this.state.historyKey) {

                let newArr2=[]

                for (let i = 0; i <a[1].length ; i++) {
                    newArr2[i]=a[2][i]

                }

                newArr=newArr2.map(c=>{

                    return <div
                        data-c={c[0]}
                                data-like={c[1]}
                                data-b={c[2]}
                                data-a={c[3]}
                                id={c[4]}
                                data={c[5]}
                                className={c[6]}
                                style={{

                                    float: 'left',
                                    backgroundImage: `url("${c[2]}")`,
                                    backgroundSize: 'cover',
                                    width: '200px',
                                    height: '200px'
                                }}></div>
                })

            }

        })
        return <div style={{display: this.state.displayLike}}>{newArr}</div>
    }
        cc=()=>{
            let div=''
            let newArr=[]
            this.state.historyArray.forEach((a,b)=> {
                if (a[0] == this.state.historyKey) {

                    let newArr2=[]

                    for (let i = 0; i <a[3].length ; i++) {
                        newArr2[i]=a[3][i]

                    }

                    newArr=newArr2.map(c=>{

                        return <div
                                    data-c={c[0]}
                                    data-like={c[1]}
                                    data-b={c[2]}
                                    data-a={c[3]}
                                    id={c[4]}
                                    data={c[5]}
                                    className={c[6]}
                                    style={{

                                        float: 'left',
                                        backgroundImage: `url("${c[2]}")`,
                                        backgroundSize: 'cover',
                                        width: '200px',
                                        height: '200px'
                                    }}></div>
                    })

                }

            })
            return <div  style={{display: this.state.displayData}}>{newArr}</div>
        }
        dd=()=>{
            let div=''
            let newArr=[]
            this.state.historyArray.forEach((a,b)=> {
                if (a[0] == this.state.historyKey) {

                    let newArr2=[]

                    for (let i = 0; i <a[4].length ; i++) {
                        newArr2[i]=a[4][i]

                    }

                    newArr=newArr2.map(c=>{

                        return <div
                                    data-c={c[0]}
                                    data-b={c[1]}
                                    data-a={c[2]}
                                    className='like'


                                    style={{

                                        float: 'left',
                                        backgroundImage: `url("${c[1]}")`,
                                        backgroundSize: 'cover',
                                        width: '200px',
                                        height: '200px'
                                    }}></div>
                    })

                }

            })
            return <div  style={{display: this.state.displayFavourite}}>{newArr}</div>
        }
        componentDidUpdate (){

        let newArr2=this.state.historyArray.filter((item) => {
                if(item[0] != this.state.keyWord){
                    return item
            }
            })
            console.log('query',document.querySelector(`[data-type="major"]`).children)
            let a=document.querySelector(`[data-type="major"]`).children
            let b=document.querySelector(`div[data-type="like"]`).children
            let c=document.querySelector(`div[data-type="data"]`).children
            let d=document.querySelector(`div[data-type="favourite"]`).children
            let aArray=[]
            for (let i = 0; i <a.length ; i++) {


                aArray[i]=[a[i].attributes[0].value, a[i].attributes[1].value, a[i].attributes[2].value, a[i].attributes[3].value, a[i].attributes[4].value,
                    a[i].attributes[5].value, a[i].attributes[6].value]
            }
            let bArray=[]
            for (let i = 0; i <b.length ; i++) {


                bArray[i]=[b[i].attributes[0].value, b[i].attributes[1].value, b[i].attributes[2].value, b[i].attributes[3].value, b[i].attributes[4].value,
                    b[i].attributes[5].value, b[i].attributes[6].value]
            }
            let cArray=[]
            for (let i = 0; i <c.length ; i++) {


                cArray[i]=[c[i].attributes[0].value, c[i].attributes[1].value, c[i].attributes[2].value, c[i].attributes[3].value, c[i].attributes[4].value,
                    c[i].attributes[5].value, c[i].attributes[6].value]
            }
            let dArray=[]
            for (let i = 0; i <d.length ; i++) {


                dArray[i]=[d[i].attributes[0].value, d[i].attributes[1].value, d[i].attributes[2].value, d[i].attributes[3].value, d[i].attributes[4].value]
            }
            console.log(aArray)
            newArr2.push([this.state.keyWord,aArray,bArray,cArray,dArray])
            this.state.historyArray=newArr2
            console.log('newArr2',newArr2,this.state.keyWord)
            console.log('history',this.state.historyArray)


    }
        likeClickHistory = (e) => {
            if (e.target.dataset.like == 'false') {


                let a = e.target.dataset.a
                let c = e.target.dataset.b
                let array = [a, c]
                let b = document.querySelectorAll(`[data-a="${a}"`)
                b.forEach(a => {
                    a.className = 'like'
                    a.dataset.like = 'true'
                })
               } else {

                let a = e.target.dataset.a
                let b = document.querySelectorAll(`[data-a="${a}"`)
                b.forEach(a => {
                    a.className = ''
                    a.dataset.like = 'false'
                })


            }
        }

        render() {

            return (
                <div style={{width: '1000px', margin: '0px auto'}}>

                    <div>Historia Wyszukiwania</div>
                    {this.category()}
                    <div style={{display: this.state.displayMistake, color: 'red'}}>Bład! Ta kategoria została już zapisana
                    </div>
                    <Sort clikeFavouriteArray={this.clikeFavouriteArray} clickLikeArray={this.clickLikeArray} displayLike={this.state.displayLike}
                          displayData={this.state.displayData} displayFavourite={this.state.displayFavourite} clickDataArray={this.clickDataArray}/>
                    <div className="div" style={{display:this.state.displaydiv}}>
                    {this.majorArray()}
                    {this.likeArray()}
                    {this.dataArray()}
                    {this.favouriteArray()}

                    </div>
                    <div className="history, div" style={{display:this.state.displaydiv2}}>
                        {this.aa()}
                        {this.bb()}
                        {this.cc()}
                        {this.dd()}
                    </div>

                    <Input categorylistonclikc={this.categorylistonclikc}
                        clickDelateLike={this.clickDelateLike}  arrayPattern={this.arrayPattern}
                           clickMajorArray={this.clickMajorArray}   fetch={this.newFetch}
                           stateNewKeyWord={this.stateNewKeyWord}
                           categoryClick={this.categoryClick2}
                           keyWord={this.state.keyWord}/>
                </div>
            )


        }
    }


    class App extends React.Component{
        render(){
            return(
                <List/>

            )
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});


