/* eslint-disable react/prop-types */
// import React from 'react'

const AboutItem = ({item}) => {

  
  return (
    <p className="text-sm lg">
      <span className="text-[rgb(120,120,120)]">{`${item['name']}: `}
        </span> 
        <span>
          {item['info']}
        </span>
    </p>
  );
};

const AboutMovie = ({$data,$movieType}) => {

  let about
  if($movieType ==='tv'){
  about = [{'name':'Creators','info':$data['created_by'].map((item)=> item.name+', ')},
  {'name':'Genres','info':$data['genres'].map((item)=> item.name+', ')},
  {'name':'First Air Date','info':$data['first_air_date'] },
  {'name':'Last Air Date','info':$data['last_air_date'] },
  {'name':'Status','info':$data['status']}
]
  }else{
  about = [{'name':'Creators','info':$data['production_companies'].map((item)=> item.name+', ')},
  {'name':'Genres','info':$data['genres'].map((item)=> item.name+', ')},
  {'name':'Release Date','info':$data['release_date'] },
  {'name':'Runtime','info':$data['runtime']+'m' },
  {'name':'Status','info':$data['status']}
]
  }



  return (
    <div className="text-white flex flex-col gap-1 mt-5">
      <p className="text-xl mb-2 font-bold">About {$data['name']||$data['original_title']}</p>
     {about &&
     about.map((item,index)=> <AboutItem key={index} item={item} />)}
    </div>
  );
};

export default AboutMovie;
