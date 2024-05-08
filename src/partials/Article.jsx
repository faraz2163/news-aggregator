import React from "react";

const Article = ({ article, showImage = true }) => {
  return (
    <div className="rounded-2xl overflow-hidden">
      <a href="/">
        {showImage && (
          <img
            src="https://s3-alpha-sig.figma.com/img/3bfd/3adf/2c3c2343ee7adaa3304072a73c38a577?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UEvCYGL-KdiPi~sbC~gQcbt9qrqvmwFl8ofjM1JAQnQifBCKfY8FIgT2VuFlDUGTJS-ZOeXSoxigl8t15uZKlgHVe5orKsWmTxyaj8q397mYFpMTchT2dr~LwnQMqYqnwndWwGVIrzTCfWBIDK5u2gJXmEKMH1SAp8LmTiZkgSMEJNTPTZGoJO-Ycuy9Sds~rJhRv4YtJ~FRD~7khl4h4eFnY2auP7CIb-a3355wGnaNiU2OurgegTBCTw~yRLYLkGpvNdeBuhGsr3LPnUSSekitF7vkyQl0SWiMeRtXoFqCQIUKfS3p-nbGlIOxG9NoEdjBkz-C6wplkquUd-SqIg__"
            alt=""
            className="object-cover object-center h-96 w-full rounded-2xl"
          />
        )}
        <div className="p-4 flex flex-col gap-2">
          <h4 className="text-xl text-indigo-600">The New York Times</h4>
          <h3 className="text-xl font-semibold">
            Google Employees Tune Out Antitrust Threat as Trial Comes to a Head
          </h3>
          <p>
            They shrugged off concerns about the company’s fate ahead of closing
            arguments in the Justice Department’s lawsuit this week.
          </p>
          <p className="text-gray-400">
            <span>2d ago</span> | By <span>John Doe</span>
          </p>
        </div>
      </a>
    </div>
  );
};

export default Article;
