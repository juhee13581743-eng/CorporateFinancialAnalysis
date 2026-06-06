// api/proxy.js

export default async function handler(req, res) {
  // CORS 헤더 허용 설정
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 요청 경로 파라미터 추출
  const { path } = req.query;
  
  if (!path) {
    res.status(400).json({ error: "Missing path parameter" });
    return;
  }

  // DART Open API에 전달할 쿼리스트링 재조합
  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(req.query)) {
    if (key !== 'path') {
      queryParams.append(key, value);
    }
  }
  
  const targetUrl = `https://opendart.fss.or.kr/${path}?${queryParams.toString()}`;

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        // 일반 브라우저의 User-Agent를 삽입하여 DART 방화벽 차단을 우회합니다.
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Upstream returned status ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Vercel Serverless Proxy Error:", error);
    res.status(502).json({ 
      error: "Bad Gateway", 
      message: error.message,
      targetUrl: targetUrl.split('crtfc_key=')[0] + 'crtfc_key=MASKED'
    });
  }
}
