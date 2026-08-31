(() => {
  const giftPhotos = {
    'Pañales RN': 'https://jacky.cl/cdn/shop/files/emubabyletal-33.jpg?v=1710974009&width=1946',
    'Pañales talla P/S': 'https://product-images.farmatodo.com/_2-I21RIdSQYDzZ8A5HHkRUm26OPA5G8tgncAybZBVeZo-CTkPN4bxFaOa9yUEoC5C4kZhYgyIU-dDut6AzTEqN9jP7U7ixQVCKiPmTpjIQqtuk',
    'Pañales talla M': 'https://cdn.shopify.com/s/files/1/0368/1363/5716/files/7775021950032.jpg?v=1775016120',
    'Toallitas húmedas': 'https://jumboargentina.vtexassets.com/arquivos/ids/585455-800-600?aspect=true&height=600&v=637257138272900000&width=800',
    'Crema para pañal': 'https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/201909/23/00155755700089____1__600x600.jpg',
    'Set de bodys 0–3 meses': 'https://elektra.vtexassets.com/arquivos/ids/16336639/mt-0084-PA-OP236600-CG-1.jpg?v=638900917027500000',
    'Set de bodys 3–6 meses': 'https://baberin.cl/cdn/shop/files/1.1Ajuarblanco.png?v=1772646303&width=1024',
    'Pijamas enterizos': 'https://lovingmunay.com/cdn/shop/files/Fotosparapaginaweb_854ddabf-c71a-47c3-bed7-36949cf8f3e6.jpg?v=1708565134&width=1920',
    'Baberos': 'https://rimage.ripley.com.pe/home.ripley/Attachment/WOP/1/2033249084461/full_image-2033249084461.jpg',
    'Toallas con capucha': 'https://i5.walmartimages.com/asr/1488faef-b7aa-45a2-a265-966ff330ddb1.6157ebc8887a8a4262eb0f790f8e3fc8.jpeg?odnBg=FFFFFF&odnHeight=612&odnWidth=612',
    'Bañera para bebé': 'https://kukuli.vtexassets.com/arquivos/ids/173301/21421577.jpg?v=637816641576200000',
    'Kit de aseo': 'https://media.falabella.com/falabellaCL/140546557_02/w%3D1500%2Ch%3D1500%2Cfit%3Dcover',
    'Termómetro digital': 'https://loladiazbebes.com/27876-large_default/termometro-para-bebe-miniland-thermoflex.jpg',
    'Protector de colchón': 'https://http2.mlstatic.com/D_NQ_NP_974680-MLU73256872369_122023-O.webp',
    'Juego de sábanas para cuna': 'https://f.fcdn.app/imgs/08d390/mikangaroo.com.uy/parauy/be8d/original/catalogo/90044578924090044431/1920-1200/juego-3-piezas-sabanas-cuna-blanco.jpg',
    'Muselinas / mantitas': 'https://catalog.cdn.bixoto.com/assets/es/B1GGSZGKWZ/images/b05db3293dbe/09c1d080-img_1.jpg?class=s700',
    'Mochila maternal': 'https://acdn-us.mitiendanube.com/stores/597/843/products/2979-16468293631-d642f6a3b6f5cfc97516469296432674-1024-1024.webp',
    'Cambiador portátil': 'https://media.falabella.com/falabellaPE/129323873_01/w%3D1500%2Ch%3D1500%2Cfit%3Dcover',
    'Mordedores': 'https://cdn.juguetilandia.com/images/articulos/1999956140g00.jpg',
    'Libritos para bebé': 'https://www.abrecuentos.com/cdn/shop/files/telcolo_2048x2048.jpg?v=1701357951',
    'Gimnasio de actividades': 'https://www.toysrus.es/medias/?context=bWFzdGVyfHByb2R1Y3RfaW1hZ2VzfDM4Mzk2fGltYWdlL2pwZWd8YUdRMkwyZ3hNeTh5T1RVNU1UZzBNalkxTWpFNU1BfGZjNmJjNzY1MGZjYzJhM2NjMDFmYTViYTc4ZDdkODcwNTg3NzE1OWM0NTczZTYzNjE2ZmU3OWMyNmQxYmExOWM',
    'Coche para bebé': 'https://cdn.dsmcdn.com/ty1626/prod/QC/20250119/14/8181d3d5-e4d8-3dc1-bb56-9e04f683ec17/1_org_zoom.jpg',
    'Silla de auto': 'https://ss413.liverpool.com.mx/lg/1165887375.jpg',
    'Cuna / colecho': 'https://www.sillasparabebes.com/37158-large_default/minicuna-colecho-lulu.jpg'
  };

  const fallbacks = {
    'Pañales RN':'🧷','Pañales talla P/S':'🧷','Pañales talla M':'🧷','Toallitas húmedas':'🫧','Crema para pañal':'🧴',
    'Set de bodys 0–3 meses':'👕','Set de bodys 3–6 meses':'👕','Pijamas enterizos':'🌙','Baberos':'🍼','Toallas con capucha':'🛁',
    'Bañera para bebé':'🛁','Kit de aseo':'🧼','Termómetro digital':'🌡️','Protector de colchón':'🛏️','Juego de sábanas para cuna':'☁️',
    'Muselinas / mantitas':'🧸','Mochila maternal':'🎒','Cambiador portátil':'👶','Mordedores':'🦷','Libritos para bebé':'📚',
    'Gimnasio de actividades':'🧸','Coche para bebé':'🛒','Silla de auto':'🚗','Cuna / colecho':'🛏️'
  };

  function buildPhoto(name, compact = false) {
    const src = giftPhotos[name];
    if (!src) return null;
    const wrap = document.createElement('div');
    wrap.className = compact ? 'real-gift-photo compact' : 'real-gift-photo';
    Object.assign(wrap.style, {
      width: '100%',
      height: compact ? '150px' : '100%',
      minHeight: compact ? '150px' : '130px',
      display: 'grid',
      placeItems: 'center',
      overflow: 'hidden',
      background: '#fff'
    });
    const img = document.createElement('img');
    img.src = src;
    img.alt = name;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.referrerPolicy = 'no-referrer';
    Object.assign(img.style, {width:'100%',height:'100%',objectFit:'contain',display:'block',padding:'8px'});
    img.onerror = () => {
      wrap.innerHTML = `<span style="font-size:3rem">${fallbacks[name] || '🎁'}</span>`;
    };
    wrap.appendChild(img);
    return wrap;
  }

  function applyGiftPhotos() {
    document.querySelectorAll('.gift-card').forEach(card => {
      const name = card.querySelector('h3')?.textContent?.trim();
      const thumb = card.querySelector('.gift-thumb');
      if (!name || !thumb || !giftPhotos[name] || thumb.dataset.realPhoto === '1') return;
      const photo = buildPhoto(name);
      if (!photo) return;
      thumb.textContent = '';
      thumb.appendChild(photo);
      thumb.dataset.realPhoto = '1';
      thumb.style.background = '#fff';
      thumb.style.padding = '0';
    });

    document.querySelectorAll('.big-card').forEach(card => {
      const name = card.querySelector('h3')?.textContent?.trim();
      if (!name || !giftPhotos[name] || card.dataset.realPhoto === '1') return;
      const first = card.firstElementChild;
      const photo = buildPhoto(name, true);
      if (!photo) return;
      if (first) first.replaceWith(photo); else card.prepend(photo);
      card.dataset.realPhoto = '1';
    });
  }

  function applyDialogPhoto() {
    const dialog = document.querySelector('#giftDialog');
    if (!dialog?.open) return;
    const title = dialog.querySelector('.dialog-title')?.textContent || '';
    const name = Object.keys(giftPhotos).find(n => title.includes(n));
    if (!name) return;
    const content = dialog.querySelector('#dialogContent');
    if (!content || content.querySelector('.dialog-real-photo')) return;
    const photo = buildPhoto(name, true);
    if (!photo) return;
    photo.classList.add('dialog-real-photo');
    photo.style.borderRadius = '18px';
    photo.style.marginBottom = '16px';
    const first = content.firstElementChild;
    if (first && !first.classList.contains('dialog-title')) first.replaceWith(photo);
    else content.prepend(photo);
  }

  let queued = false;
  const observer = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      applyGiftPhotos();
      applyDialogPhoto();
    });
  });

  function init() {
    applyGiftPhotos();
    applyDialogPhoto();
    observer.observe(document.body, {childList:true, subtree:true, attributes:true, attributeFilter:['open']});
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
