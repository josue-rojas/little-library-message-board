import React, { useEffect, useState } from "react";
import UnsentBox from "components/UnsentBox";
import styles from "./styles.module.css";
import { ref, onValue } from "firebase/database";
import { database as db} from 'firebase.js'
import { INIT_UNSENT_STATE, POST_MESSAGE_API } from "constants.js";
import { constructColor } from "utils";

const AllPost = () => {
  const [allPost, seAllPost] = useState([]);

  useEffect(() => {
    const postRref = ref(db, POST_MESSAGE_API);
    onValue(postRref, snapshot => {
      if (snapshot.val()) {
        const data = Object.entries(snapshot.val());

        let sortedPost = data.map((post) => {
          const [key, singlePost] = post
          return [key, {
            ...singlePost,
            backgroundColorSort: constructColor(singlePost.backgroundColor)
          }]
        }).sort((postA, postB) => {
          const [_keyA, singlePostA] = postA;
          const [_keyB, singlePostB] = postB;
          return singlePostA.backgroundColorSort.hue - singlePostB.backgroundColorSort.hue  
        })

        seAllPost(sortedPost);
      } else {
        seAllPost(['blah', {
          text: "No Message Found",
          to: "ERROR"
        }]);
      }
    })
  }, []);

  return (
    <div className={styles.random}>
      {allPost.map((post) => {
        const [key, singlePost] = post;
        return (<UnsentBox
          key={key}
          initBackgroundColor={singlePost.backgroundColor}
          initMessage={singlePost.text}
          initTextColor={singlePost.textColor}
          initDate={singlePost.dateAdded}
          isDisabled={true}
        />)
      })}
    </div>
  );
};

export default AllPost;
