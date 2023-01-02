class Album {
  constructor(name, artist, year) {
    this.name = name;
    this.artist = artist;
    this.year = year;
  }

  getName(){
    return this.name;
  }
  getArtist(){
    return this.artist;
  }
  getYear(){
    return this.year;
  }
  
  albumHtml() {
    return `
    <article class="card col-md-3 col-sm-8 m-3 p-3">
            <h2 class="card-header">${this.name}</h2>
            <em>${this.artist}</em>
            <ul class="card-body">
                <li class="card-text">${this.year}</li>
            </ul>
        </article>
      `
}

  print(){
    console.log(`${this.name} made by ${this.artist} in the year ${this.year}`)
  }
}




module.exports = Album;