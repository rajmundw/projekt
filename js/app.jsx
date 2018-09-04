import React from 'react';
import ReactDOM from 'react-dom';
document.addEventListener('DOMContentLoaded', function() {
    let counter =0
    let arrayElements = [];
    let couter=0

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
                    <div style={{display:this.props.display1}}>Sortowane wg ilosci lajków</div>
                    <div style={{display:this.props.display2}}>Sortowane wg daty utworzenia</div>
                    <div style={{display:this.props.display3}}> Plubione zadjęcia</div>
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
            this.props.clickDelateLike()
            this.props.fetch()
            this.props.clickMajorArray()
            this.props.arrayPattern()
            this.props.categoryClick()

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
                categoriesList: [],
                likeArray: [],
                displayMajor: 'block',
                displayLike: 'none',
                displayData: 'none',
                displayFavourite: 'none',
                displayMistake: 'none',
                likeList: [],
                likeValue: false,
                likeClass: ''


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
/*
            console.log('newarr' , newArr)
*/
            return <div style={{display: this.state.display0}}>{newArr}</div>
        }


        likeArray = () => {
            let newArr = this.state.answerFullArray.slice()
            newArr = newArr.sort((a, b) => {

                return b.props.id - a.props.id
            })

            return <div style={{display: this.state.display1}}>{newArr}</div>
        }


        dataArray = () => {
            let newArr = this.state.answerFullArray.slice()
            newArr = newArr.sort((a, b) => {

                return Number(b.props.data) - Number(a.props.data)
            })
/*
            console.log(newArr)
*/
            return <div style={{display: this.state.display2}}>{newArr}</div>
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
/*
            console.log(newArr)
*/

            return <div className='favourites' style={{display: this.state.display3}}>{newArr}</div>
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
                })
        }


        category = () => {
            let newArr = this.state.categoriesList.slice()
            newArr = newArr.map(a => {
                return <option>{a}</option>
            })
            return <select>{newArr}</select>
        }


        categorylistonclikc=()=>{
        if (this.state.categoriesList.length == 0) {
             let newArr = this.state.categoriesList.slice()
            newArr.push(this.state.keyWord)
            this.setState({
                          categoriesList: newArr
                      })

                }else
             {

        let newArr = this.state.categoriesList.slice()
        console.log(this.state.keyWord)
        let counter=0;
        newArr.forEach(a => {
            if (a == this.state.keyWord) {
                return counter=counter+1
                }})
            if(counter==0) {
                let newArr = this.state.categoriesList.slice()
                newArr.push(this.state.keyWord)
                this.setState({
                    categoriesList: newArr
                })
            }else {
                this.categoryClick()
            }
        }

    }



        render() {

            return (
                <div style={{width: '1000px', margin: '0px auto'}}>

                    <button onClick={this.categorylistonclikc}>zapisz</button>
                    <div>Historia Wyszukiwania</div>
                    {this.category()}
                    <div style={{display: this.state.display4, color: 'red'}}>Bład! Ta kategoria została już zapisana
                    </div>
                    <Sort clikeFavouriteArray={this.clikeFavouriteArray} clickLikeArray={this.clickLikeArray} display1={this.state.display1}
                          display2={this.state.display2} display3={this.state.display3} clickDataArray={this.clickDataArray}/>
                    {this.majorArray()}
                    {this.likeArray()}
                    {this.dataArray()}
                    {this.favouriteArray()}
                    <Input clickDelateLike={this.clickDelateLike}  arrayPattern={this.arrayPattern}
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


