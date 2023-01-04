class Album {
  constructor(name, artist, summary, img, count) {
    this.name = name;
    this.artist = artist;
    this.summary = summary;
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
    <article class="card col-9 m-3 p-3" id="album${this.count}">
            <h2 class="card-header">${this.count}. ${this.name}</h2>
            <em>${this.artist}</em>
            <div class="cardcont">
            <img class="cardimg" src='${this.img}' alt='artwork for ${this.name} by ${this.artist}' width="250px">
            <div class="textcont">
                <p class="cardtext">${this.summary}</p>
                </div>
              </div>
        </article>
      `
}

  print(){
    console.log(`${this.name} made by ${this.artist} in the year ${this.year}`)
  }
}




module.exports = Album;