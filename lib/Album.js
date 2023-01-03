class Album {
  constructor(name, artist, year, img, count) {
    this.name = name;
    this.artist = artist;
    this.year = year;
    this.img = img;
    this.count = count;
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
    <article class="card col-md-3 col-sm-8 m-3 p-3" id="album${this.count}">
            <h2 class="card-header">${this.count}. ${this.name}</h2>
            <em>${this.artist}</em>
            <ul class="card-body">
                <li class="card-text">${this.year}</li>
                <img src='${this.img}' alt='artwork for ${this.name} by ${this.artist}'>
            </ul>
        </article>
      `
}

  print(){
    console.log(`${this.name} made by ${this.artist} in the year ${this.year}`)
  }
}




module.exports = Album;