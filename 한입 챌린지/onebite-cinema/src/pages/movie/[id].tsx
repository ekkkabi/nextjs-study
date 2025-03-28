import style from './[id].module.css';

const mockData = {
  id: 786892,
  title: '퓨리오사: 매드맥스 사가',
  releaseDate: '2024-05-22',
  company: 'Warner Bros. Pictures, Kennedy Miller Mitchell, Domain Entertainment',
  genres: ['액션', '모험', 'SF'],
  subTitle: '분노가 깨어나다',
  description:
    '문명 붕괴 45년 후, 황폐해진 세상 속 누구에게도 알려지지 않은 풍요가 가득한 녹색의 땅에서 자란 퓨리오사는 바이커 군단의 폭군 디멘투스의 손에 모든 것을 잃고 만다. 가족도 행복도 모두 빼앗기고 세상에 홀로 내던져진 퓨리오사는 반드시 고향으로 돌아가겠다는 어머니와의 약속을 지키기 위해 인생 전부를 건 복수를 시작하는데...',
  runtime: 149,
  posterImgUrl:
    'https://media.themoviedb.org/t/p/w300_and_h450_face/zaUFDdJidS4Nyyd6jb2Ok3Kq4Vo.jpg',
};

export default function Page() {
  const { title, releaseDate, company, genres, subTitle, description, runtime, posterImgUrl } =
    mockData;
  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} />
      </div>
      <h3 className={style.title}>{title}</h3>
      <div>
        {releaseDate} / {genres} / {runtime}분
      </div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
