// import { render } from "react-dom";
// import { useState } from "react"
// import { songs } from "../song/SongProvider"
// import Song from "../song/Song"

// export default (props) => {

//     class SearchText extends React.Component {
//         constructor() {
//             super();
//             this.state = {
//                 search: ''
//             };
//         }  

// updateSearch(event) {
//     this.setState({searchText: event.target.value.substr(0,
//         20)});
// }

// render() {
//     let searchedSongs = this.props.songs.filter(
//         (song) => {
//             return song.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
//         }
//     );
//     return (
//         <div>
//             <ul>
//                 {searchedSongs.map((song) => {
//                     return <Song searchedSong={searchedSong}
//                         key={searchedSong.id}
//                 })}
//             </ul>
//             <input type="text"
//             value={this.state.search}
//             onChange={this.updateSearch.bind(this)}/>
//         </div>
//     )
// }
// }
// }