import React from "react";
import Container from "../Container";
import Card from "../Card";
import Article from "../Article";

const Feed = () => {
  return (
    <Container className="flex-col">
      <Card className={`abc`}>
        <div>
          <Article />
        </div>
        {/* <div className="container flex flex-wrap gap-1"> */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Article />
          </div>
          <div>
            <Article />
          </div>
          <div>
            <Article />
          </div>
          <div>
            <Article />
          </div>
        </div>
        {/* </div> */}
      </Card>
    </Container>
  );
};

export default Feed;
