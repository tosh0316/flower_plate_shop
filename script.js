// Import libraries
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader' 


// reference the definition
//const definitionName = 'flower_plate_sara.gh'

// setup input change events
/*
const param1_slider = document.getElementById('param1')
param1_slider.addEventListener('mouseup', onChange, false)
param1_slider.addEventListener('touchend', onChange, false)
*/

const param2_slider = document.getElementById('param2')
param2_slider.addEventListener('mouseup', onChange, false)
param2_slider.addEventListener('touchend', onChange, false)

const param3_slider = document.getElementById('param3')
param3_slider.addEventListener('mouseup', onChange, false)
param3_slider.addEventListener('touchend', onChange, false)

/*
const param4_slider = document.getElementById('param4')
param4_slider.addEventListener('mouseup', onChange, false)
param4_slider.addEventListener('touchend', onChange, false)

const param5_slider = document.getElementById('param5')
param5_slider.addEventListener('mouseup', onChange, false)
param5_slider.addEventListener('touchend', onChange, false)
*/
const param6_slider = document.getElementById('param6')
param6_slider.addEventListener('mouseup', onChange, false)
param6_slider.addEventListener('touchend', onChange, false)

const param7_slider = document.getElementById('param7')
param7_slider.addEventListener('mouseup', onChange, false)
param7_slider.addEventListener('touchend', onChange, false)
/*
const param8_slider = document.getElementById('param8')
param8_slider.addEventListener('mouseup', onChange, false)
param8_slider.addEventListener('touchend', onChange, false)
*/



// globals
let definition, doc
let scene, camera, renderer
let plateContainer = new THREE.Group()
let priceTable = null  
const priceDisplay = document.getElementById('priceDisplay')
const MODEL_DIR = './models/'

// source a .gh / .ghx file in the same directory
//let url = definitionName
//let res = await fetch(url)
//let buffer = await res.arrayBuffer()
//definition = new Uint8Array(buffer)
//let rhinoMeshGroup



init()


async function compute(){
  showSpinner(true)

    /*
    let param1 = new RhinoCompute.Grasshopper.DataTree('takaku_n')
    param1.append([0], [param1_slider.valueAsNumber])
    const param1Value = document.getElementById("param1").value
    console.log("param1:", param1Value) 
    document.getElementById('param1').oninput = () => updateValue('param1')

    let param2 = new RhinoCompute.Grasshopper.DataTree('takaku_a')
    param2.append([0], [param2_slider.valueAsNumber])
    const param2Value = document.getElementById("param2").value
    console.log("param2:", param2Value) 
    document.getElementById('param2').oninput = () => updateValue('param2')

    let param3 = new RhinoCompute.Grasshopper.DataTree('dia')
    param3.append([0], [param3_slider.valueAsNumber])
    const param3Value = document.getElementById("param3").value
    console.log("param3:", param3Value) 
    document.getElementById('param3').oninput = () => updateValue('param3')

    let param4 = new RhinoCompute.Grasshopper.DataTree('height')
    param4.append([0], [param4_slider.valueAsNumber])
    const param4Value = document.getElementById("param4").value
    console.log("param4:", param4Value) 
    document.getElementById('param4').oninput = () => updateValue('param4')

    let param5 = new RhinoCompute.Grasshopper.DataTree('hanakei')
    param5.append([0], [param5_slider.valueAsNumber])
    const param5Value = document.getElementById("param5").value
    console.log("param5:", param5Value) 
    document.getElementById('param5').oninput = () => updateValue('param5')

    let param6 = new RhinoCompute.Grasshopper.DataTree('kabensu')
    param6.append([0], [param6_slider.valueAsNumber])
    const param6Value = document.getElementById("param6").value
    console.log("param6:", param6Value) 
    document.getElementById('param6').oninput = () => updateValue('param6')

    let param7 = new RhinoCompute.Grasshopper.DataTree('hukurami')
    param7.append([0], [param7_slider.valueAsNumber])
    const param7Value = document.getElementById("param7").value
    console.log("param7:", param7Value) 
    document.getElementById('param7').oninput = () => updateValue('param7')

    let param8 = new RhinoCompute.Grasshopper.DataTree('sakikei')
    param8.append([0], [param8_slider.valueAsNumber])
    const param8Value = document.getElementById("param8").value
    console.log("param8:", param8Value) 
    document.getElementById('param8').oninput = () => updateValue('param8')



    // clear values
    let trees = []

    trees.push(param1)
    trees.push(param2)
    trees.push(param3)
    trees.push(param4)
    trees.push(param5)
    trees.push(param6)
    trees.push(param7)
    trees.push(param8)
    */
    //console.log("Sending to Rhino.Compute:", trees)

    // Call RhinoCompute
    //const res = await RhinoCompute.Grasshopper.evaluateDefinition(definition, trees)

    //console.log("Response from Rhino.Compute:", res)


    //collectResults(res)
    updatePrice()

    //load model(RhinoComputeの代わりに、あらかじめ用意しておいたモデルを表示)
    //loadModel()

    // 処理が終わったので、ローダーを隠す
    showSpinner(false)
}

function onChange(e) {

  // show spinner
  document.getElementById('loader').style.display = 'block';
  updateValue(e.target.id);

  // 1. パラメータ値の取得
  // HTMLのinput要素から値を取得
  const param_d = document.getElementById('param3').value // 例: 直径 (170)
  const param_a = document.getElementById('param2').value // 例: 形状A (6)
  const param_n = document.getElementById('param6').value // 例: 花弁数N (5)
  const param_f = document.getElementById('param7').value // 例: 深さF (40)

  // 2. ファイル名文字列の生成
  // フォーマット: d170_a6_n5_f40.glb
  const filename = `d${param_d}_a${param_a}_n${param_n}_f${param_f}.glb`
  console.log(`Loading GLB: ${filename}`)

  // 3. モデル読み込み関数を呼び出す
  loadModel(MODEL_DIR + filename)

  // 価格の再計算 (既存のロジック)
  updatePrice()
}

// =========================================================================
// GLBモデル読み込み関数
// =========================================================================

/**
 * 指定されたファイルパスのGLBモデルを読み込み、シーンを更新する
 */
function loadModel(url) {
    const loader = new GLTFLoader()
    scene.add(plateContainer)

    const woodMaterial = new THREE.MeshStandardMaterial({
      // 木の色を設定。ナラ材などの明るい色を想定
      color: 0xcdb28b,     // 例: 明るい茶色/ベージュ（ナラ材に近い）
      
      // 質感の設定（非金属、ざらつき）
      roughness: 0.8,      // 表面のざらつき（木材なので高めに）
      metalness: 0.1       // 金属感（木材なので低めに）
      // オプション: シャープな陰影のための設定
      // flatShading: false, // 滑らかな陰影
    });

    loader.load(
        url,
        // 読み込み成功時
        function (gltf) {
            // 古いモデルをシーンから削除
            // 既存のモデルをすべて削除
            while(plateContainer.children.length > 0){ 
                const child = plateContainer.children[0]
                plateContainer.remove(child)
                // メモリを解放するためにジオメトリとマテリアルを破棄
                if (child.isMesh) {
                    child.geometry.dispose()
                    //child.material.dispose()
                }
            }

            // 新しいモデル（シーン全体）を追加
            const model = gltf.scene
            
            // モデルが大きすぎたり小さすぎたりする場合にスケールを調整
            // 例：Rhinoの単位に合わせてスケールを調整する必要がある場合
            let scalefactor = 1000
            model.scale.set(scalefactor, scalefactor, scalefactor) 

            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true
                    child.receiveShadow = true
                    child.material = woodMaterial 
                }
            })

            // モデルがカメラの中心に来るように位置を調整
            const bbox = new THREE.Box3().setFromObject(model)
            const center = bbox.getCenter(new THREE.Vector3())
            model.position.sub(center) 
            model.position.z += center.z
            
            // モデルをコンテナに追加
            plateContainer.add(model)

            // ローダー非表示
            document.getElementById('loader').style.display = 'none'
            
            // カメラを初期位置に戻す
            //controls.reset()

            console.log('Model loaded successfully.')
        },
        // 読み込み中
        function (xhr) {
            // 読み込み進捗を表示する処理が必要な場合ここに記述
            //console.log((xhr.loaded / xhr.total * 100) + '% loaded')
        },
        
        // 読み込み失敗時
        function (error) {
            console.error('An error happened during GLB loading:', error)
            
            // 読み込みエラー時には、代わりにRhinoComputeを実行するなどの代替手段を検討
            // ここではエラーメッセージを表示する
            document.getElementById('loader').style.display = 'none'
            alert(`モデルの読み込みに失敗しました。\nファイル名: ${url}\nエラー: ${error.message}`)
        }
    )
}

/**
 * Parse response
 */
function collectResults(responseJson) {

  const values = responseJson.values
  //console.log(values) 

  // clear doc
  if( doc !== undefined)
      doc.delete()

  //console.log(values)
  //doc = new rhino.File3dm()

  // for each output (RH_OUT:*)...
  for ( let i = 0; i < values.length; i ++ ) {
    // ...iterate through data tree structure...
    for (const path in values[i].InnerTree) {
      const branch = values[i].InnerTree[path]
      // ...and for each branch...
      for( let j = 0; j < branch.length; j ++) {
        // ...load rhino geometry into doc
        //const rhinoObject = decodeItem(branch[j])
        //if (rhinoObject !== null) {
        //  doc.objects().add(rhinoObject, null)
        //}
      }
    }
  }

  if (doc.objects().count < 1) {
    console.error('No rhino objects to load!')
    showSpinner(false)
    return
  }

  // set up loader for converting the results to threejs
  //const loader = new Rhino3dmLoader()
  //loader.setLibraryPath( 'https://unpkg.com/rhino3dm@8.0.0-beta/' )

  //set Material
  //const resMaterial = new THREE.MeshBasicMaterial( {vertexColors: true, wireframe: false} )
  const resMaterial = new THREE.MeshStandardMaterial({
    color: 0xcdb28b,     // お皿の色（明るいベージュ）
    //color: 0xff69b4,       // ピンク色
    transparent: true, 
    opacity: 0.8,  
    roughness: 0.8,      // 表面のざらつき（陶器風）
    metalness: 0.1       // 金属感（非金属なので小さめに）
  })
  
  /*
  // load rhino doc into three.js scene
  const buffer = new Uint8Array(doc.toByteArray()).buffer
  loader.parse( buffer, 
    function ( object ) {
      if (!object) {
        console.error("Parsed object is null or undefined")
        showSpinner(false)
        return
      }
    
    
      // 👇 ここで既存のrhinoMeshGroupを削除する
      if (rhinoMeshGroup !== undefined) {
        scene.remove(rhinoMeshGroup)
      }
    

      rhinoMeshGroup = new THREE.Group()

      // add material to resulting meshes
      object.traverse( child => {
          child.material = resMaterial
          rhinoMeshGroup.add(child)
      } )

      // add object graph from rhino model to three.js scene
      scene.add( rhinoMeshGroup )

      // hide spinner
      showSpinner(false)
    },
    function(error){
      console.error('loader.parse error:', error)
      showSpinner(false)
    }
  )
    */
}

function updateValue(id) {
  const slider = document.getElementById(id)
  const display = document.getElementById(id + '_value')
  display.innerText = slider.value

}

/**
 * Shows or hides the loading spinner
 */
function showSpinner(enable) {
    if (enable)
      document.getElementById('loader').style.display = 'block'
    else
      document.getElementById('loader').style.display = 'none'
}

/**
* Attempt to decode data tree item to rhino geometry
*/
/*
function decodeItem(item) {
  const data = JSON.parse(item.data)
  if (item.type === 'System.String') {
    // hack for draco meshes
    try {
        return rhino.DracoCompression.decompressBase64String(data)
    } catch {} // ignore errors (maybe the string was just a string...)
  } else if (typeof data === 'object') {
    return rhino.CommonObject.decode(data)
  }
  return null
}
*/

/*
function getAuth( key ) {
  let value = localStorage[key]
  if ( value === undefined ) {
      const prompt = key.includes('URL') ? 'Server URL' : 'Server API Key'
      value = window.prompt('RhinoCompute ' + prompt)
      if ( value !== null ) {
          localStorage.setItem( key, value )
      }
  }
  return value
}
*/

// BOILERPLATE //

async function init () {
  const canvasContainer = document.getElementById('canvas-container')

  

  // Rhino models are z-up, so set this as the default
  THREE.Object3D.DefaultUp = new THREE.Vector3( 0, 0, 1 )
  
  scene = new THREE.Scene()
  scene.background = new THREE.Color(1,1,1)
  camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 )

  camera.position.x = 100
  camera.position.y = 50
  camera.position.z = 200

  
  // 描画先をhtmlの#canvas-containerに渡す
  renderer = new THREE.WebGLRenderer({ antialias: true });
  canvasContainer.appendChild(renderer.domElement)

    // **リサイズ処理を関数化**
  function resizeRenderer() {
    const w = canvasContainer.clientWidth
    const h = canvasContainer.clientHeight
    renderer.setSize( w, h )
    camera.aspect = w / h          // ← ここで本来のコンテナ比を使う
    camera.updateProjectionMatrix()
  }

  // 初期化直後にも必ず１回呼ぶ
  resizeRenderer()

  // ウィンドウリサイズ時にも呼ぶ
  window.addEventListener('resize', resizeRenderer)


  // 環境光（全体的に明るくする）
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambientLight)

  // 平行光源（立体感を出す陰影）
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight1.position.set(100, -100, 100)
  scene.add(directionalLight1)
  
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6)
  directionalLight2.position.set(100, 100, -100)
  scene.add(directionalLight2)

  const controls = new OrbitControls(camera, renderer.domElement)



  window.addEventListener( 'resize', onWindowResize, false )

  //サイズの大きさ参考用のガイド線---------------------------------------------
  // 1) プレート平面と同一平面に、外形線用のグループを作成
  const guideGroup = new THREE.Group();
  scene.add(guideGroup);

  // 2) 各プレートサイズの半径 (mm → world unit 換算済み) を配列で定義
  const plateSizes = [
    { name: '小皿',  radius:  60 },
    { name: '取皿',  radius: 95 },
    { name: '大皿',  radius: 135 }
  ];

  // 3) 薄い線（ライン）マテリアルを用意
  const guideMat = new THREE.LineDashedMaterial({
    color: 0x666666,
    transparent: true,
    opacity: 0.3,
    dashSize: 3,
    gapSize: 2,
  });

  const radialCount = 60;

  // 4) 各サイズの円を作って guideGroup に追加
  plateSizes.forEach(ps => {
    const radialLength = ps.radius;
    const pt =[];
    for (let i = -1; i < radialCount; i++) {
      const theta = (i / radialCount) * Math.PI * 2;
      const x = Math.cos(theta) * radialLength;
      const y = Math.sin(theta) * radialLength;
      pt.push(new THREE.Vector3(x, y, 0));

    }
    const geo = new THREE.BufferGeometry().setFromPoints(pt);
    const line = new THREE.Line(geo, guideMat);
    scene.add(line);

    // ラベルを円の一部上に表示したいなら
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = '20px sans-serif';
    ctx.fillStyle = 'rgba(100,100,100,0.8)';
    ctx.fillText(ps.name, 10, 30);
    const tex = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(50, 20, 1); // 調整
    sprite.position.set(ps.radius * Math.cos(Math.PI/4), ps.radius * Math.sin(Math.PI/4), 0.1);
    guideGroup.add(sprite);
  });

  
    // モデル読み込み
  //const loader = new GLTFLoader();
    // 👇 1. 木材マテリアルの定義
  
  //d150_a0_n3_f20.glb
  //d150_a6_n3_f40.glb
  /*loader.load('/models/d170_a6_n5_f40.glb', (gltf) => {
    // モデルの拡大処理
    const scaleFactor = 1000; 
    gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor);
    // 👇 2. 向きの修正 (RhinoのZ-upを考慮し、X軸周りに回転して水平にする)
    // お皿が床に平行になるように、X軸周りに-90度（または90度）回転させます。
    // GLBファイルの回転設定によりますが、これが一般的な解決策です。
    ///gltf.scene.rotation.x = Math.PI / 2; // -90度回転 (X軸周り)
    // 👇 3. モデルのセンタリング (カメラから見て中央に配置する)
    // プレートの重心を取得して、原点(0, 0, 0)に移動させる。
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    // モデルを原点に移動
    ///gltf.scene.position.x -= center.x;
    ///gltf.scene.position.y -= center.z;
    // 👇 5. 全てのメッシュに木材マテリアルを適用
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            child.material = woodMaterial;
            // 影を受け取れるように設定（環境光設定済みの前提で）
            child.receiveShadow = true; 
            child.castShadow = true;
        }
    });
    scene.add(plateContainer);
  });

  console.log('model load')
  */

  animate()

  //price------------------
  try {
    const res = await fetch('prices.json')
    if (!res.ok) throw new Error(res.statusText)
    priceTable = await res.json()
  }
  catch (err) {
    console.error('価格テーブルの読み込みに失敗しました:', err)
    alert('価格情報が読み込めませんでした。管理者に連絡してください。')
    priceTable = {}  // 安全策として空オブジェクト
  }
  
  // 1. パラメータ値の取得
  // HTMLのinput要素から値を取得
  const param_d = document.getElementById('param3').value // 例: 直径 (170)
  const param_a = document.getElementById('param2').value // 例: 形状A (6)
  const param_n = document.getElementById('param6').value // 例: 花弁数N (5)
  const param_f = document.getElementById('param7').value // 例: 深さF (40)

  // 2. ファイル名文字列の生成
  // フォーマット: d170_a6_n5_f40.glb
  const filename = `d${param_d}_a${param_a}_n${param_n}_f${param_f}.glb`
  console.log(`Loading GLB: ${filename}`)

  // 3. モデル読み込み関数を呼び出す
  loadModel(MODEL_DIR + filename)
  // 価格表示エリアがあれば初回更新
  updatePrice()

}

function animate () {
  requestAnimationFrame( animate )
  renderer.render( scene, camera )
}
  
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize( window.innerWidth, window.innerHeight )
  animate()
}

//-------save-------------
const saveBtn = document.getElementById('saveBtn')

if (saveBtn) {
  saveBtn.addEventListener('click', downloadConfig)
}

function downloadConfig() {
  const config = {
    dia: +param3_slider.value,
    height: +param4_slider.value,
    takaku_n: +param1_slider.value,
    takaku_a: +param2_slider.value,
    hanakei: +param5_slider.value,
    kabensu: +param6_slider.value,
    hukurami: +param7_slider.value,
    sakikei: +param8_slider.value,
    material: document.getElementById('wood').value,
    flower_name: document.getElementById('flower_name').value,
    hanakotoba: document.getElementById('hanakotoba').value
  }
  const blob = new Blob([ JSON.stringify(config, null, 2) ], { type: 'application/json' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = 'flower_plate_config.json'
  a.click()
  URL.revokeObjectURL(url)
}



//------------load----------------
const loadBtn   = document.getElementById('loadBtn')
const loadInput = document.getElementById('loadInput')

// ボタンを押すとファイル選択ダイアログを開く
//loadBtn.addEventListener('click', () => loadInput.click())

// ファイルが選ばれたら
loadInput.addEventListener('change', () => {
  const file = loadInput.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = e => {
    try {
      const config = JSON.parse(e.target.result)

      // JSON のキーに対応するコントロールに値をセット
      if (config.dia         != null) param3_slider.value = config.dia
      if (config.height      != null) param4_slider.value = config.height
      if (config.takaku_n    != null) param1_slider.value = config.takaku_n
      if (config.takaku_a    != null) param2_slider.value = config.takaku_a
      if (config.hanakei     != null) param5_slider.value = config.hanakei
      if (config.kabensu     != null) param6_slider.value = config.kabensu
      if (config.hukurami    != null) param7_slider.value = config.hukurami
      if (config.sakikei     != null) param8_slider.value = config.sakikei
      if (config.material    != null) document.getElementById('wood').value = config.material
      if (config.flower_name != null) document.getElementById('flower_name').value = config.flower_name
      if (config.hanakotoba  != null) document.getElementById('hanakotoba').value = config.hanakotoba

      // 各スライダー横の数値表示も更新
      updateValue('param1')
      updateValue('param2')
      updateValue('param3')
      updateValue('param4')
      updateValue('param5')
      updateValue('param6')
      updateValue('param7')
      updateValue('param8')

      // 読み込んだ設定で再計算
      compute()
    }
    catch (err) {
      console.error('読み込んだ JSON が不正です:', err)
      alert('設定ファイルの読み込みに失敗しました。形式を確認してください。')
    }
  }
  reader.readAsText(file)
  // 連続して同じファイルを読み込めるよう、value をクリア
  loadInput.value = ''
})

//Price--------------------------
// 木材プルダウンを取得
const woodSelect = document.getElementById('wood')

// 値が変わったら価格再計算
woodSelect.addEventListener('change', updatePrice)

function updatePrice() {
  const wood = document.getElementById('wood').value    // 木材種別
  const dia  = Number(document.getElementById('param3').value)  // 直径スライダー

  const list = priceTable[wood]
  if (!list) {
    priceDisplay.textContent = '—'
    return
  }

  // 配列 .find() で範囲にマッチするエントリを探す
  const entry = list.find(e => dia >= e.min && dia <= e.max)
  if (entry) {
    priceDisplay.textContent = `¥${entry.price.toLocaleString()}`
  } else {
    priceDisplay.textContent = '要見積り'
  }
}


//注文操作------------------------------------------
// BASEショップのカートURL
const BASE_CART_URL = 'https://cotomos.base.shop/shops/cotomos-base-shop/checkout/edit' 

// 注文ボタンの要素を取得
const orderBtn = document.getElementById('orderBtn')

// イベントリスナーを設定
orderBtn.addEventListener('click', proceedToOrder)

function getOrderDetails() {
    // 現在のパラメータ値を取得
    const d = document.getElementById('param3')?.value || 'N/A'
    const a = document.getElementById('param2')?.value || 'N/A'
    const n = document.getElementById('param6')?.value || 'N/A'
    const f = document.getElementById('param7')?.value || 'N/A'
    const wood = document.getElementById('wood')?.value || 'N/A'
    const flowerName = document.getElementById('flower_name')?.value || 'N/A'
    const hanakotoba = document.getElementById('hanakotoba')?.value || 'N/A'

    // 注文情報を整形
    const details = 
`
--- 注文情報 ---
直径: ${d}
丸み: ${a}
花弁数: ${n}
膨らみ: ${f}
木材: ${wood}
花の名前: ${flowerName}
花言葉: ${hanakotoba}
--- 備考欄に貼り付けてください ---
`
    return details.trim()
}

async function proceedToOrder() {
    const orderDetails = getOrderDetails()

    // 1. クリップボードにコピー
    try {
        await navigator.clipboard.writeText(orderDetails)
        
        // コピー成功をユーザーに通知
        alert(
            '注文情報がクリップボードにコピーされました！\n' +
            'BASEの「備考欄」に貼り付けてください。\n\n' +
            '【コピーされた情報】\n' + orderDetails
        )

        // 2. BASEのカート画面へ遷移
        window.open(BASE_CART_URL, '_blank')

    } catch (err) {
        console.error('クリップボードのコピーに失敗しました。', err)
        alert('注文情報のコピーに失敗しました。手動でメモしてください。')
        
        // 遷移だけは行う
        window.open(BASE_CART_URL, '_blank')
    }
}
