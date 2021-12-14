class Meetup {
  constructor(opt = {}) {
    this.id = opt._id.toString();
    this.title = opt.title;
    this.image = opt.image;
    this.address = opt.address;
    this.description = opt.description;
  }
}

export default Meetup;
