import React from 'react';

const About = () => {
    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="text-info"> ABOUT US </h1>
                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget mauris pharetra et ultrices neque. Sed turpis tincidunt id aliquet risus feugiat in ante. Bibendum ut tristique et egestas quis ipsum. Risus at ultrices mi tempus imperdiet. A diam maecenas sed enim ut sem viverra aliquet. Faucibus vitae aliquet nec ullamcorper sit amet. Facilisis leo vel fringilla est. Pharetra sit amet aliquam id diam. Elit pellentesque habitant morbi tristique senectus. Ultrices tincidunt arcu non sodales neque sodales ut. Elit ut aliquam purus sit. Velit sed ullamcorper morbi tincidunt ornare. Vitae et leo duis ut diam. Id velit ut tortor pretium viverra suspendisse potenti. Ut ornare lectus sit amet est placerat. Et leo duis ut diam quam nulla porttitor massa. Volutpat sed cras ornare arcu.</p>
            </div>
            <h2> Contact us </h2> <br />
            <form>
            <div className="form-group">
                    <label for="exampleFormControlInput1">Your name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="John Doe" />
                </div>
                <div className="form-group">
                    <label for="exampleFormControlInput1">Email address</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Your message: </label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <button type="button" class="btn btn-primary">Submit</button>
            </form>
            <hr />
        </div>
    )
}

export default About;