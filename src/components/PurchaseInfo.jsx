export default function PurchaseInfo() {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-8 text-gray-800">
        <section>
          <h2 className="text-2xl font-bold border-b pb-2 mb-4">購物說明</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>訂單確認後，我們將於 <strong>3～5 個工作天</strong>內出貨，除非宇宙不允許。</li>
            <li>寄送方式可能包含：快遞、鴿子、念力、或其他不可言喻的方法。</li>
            <li><strong>沒有收到商品屬正常現象</strong>，請不要聯絡客服處理此問題，避免客服受到驚嚇。</li>
          </ul>
        </section>
  
        <section>
          <h2 className="text-2xl font-bold border-b pb-2 mb-4">付款方式</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>支援信用卡、虛擬帳號、超商付款與<strong>用愛發電</strong>。</li>
            <li>「用眼神支付」目前仍在 Beta 測試中，請勿濫用。</li>
          </ul>
        </section>
  
        <section>
          <h2 className="text-2xl font-bold border-b pb-2 mb-4">退換貨政策</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>若收到商品有明顯瑕疵（如異次元裂縫），請拍照傳給我們，我們會轉發給 UFO 調查組。</li>
            <li>如您執意退貨，請先通過我們的 108 題靈魂測驗以驗證誠意。</li>
          </ul>
        </section>
  
        <section>
          <h2 className="text-2xl font-bold border-b pb-2 mb-4">常見問題 FAQ</h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-semibold">Q：商品何時會送達？</dt>
              <dd>A：如果天氣不錯，也許三天內；如果下雨，可能永遠不會到。</dd>
            </div>
            <div>
              <dt className="font-semibold">Q：我沒有收到商品怎麼辦？</dt>
              <dd>A：這是預期內的正常情況，您可以考慮冥想與之和解。</dd>
            </div>
            <div>
              <dt className="font-semibold">Q：你們是詐騙嗎？</dt>
              <dd>A：我們傾向稱自己為「藝術性社會實驗」，聽起來比較有溫度。</dd>
            </div>
            <div>
              <dt className="font-semibold">Q：可以聯絡客服嗎？</dt>
              <dd>A：客服營業時間為每天中午 12:00～12:01，請提早卡位。</dd>
            </div>
          </dl>
        </section>
  
        <section className="text-sm text-gray-500 pt-6 border-t">
          <p>
            本網站純屬虛構，如有雷同，純屬你想太多。下單即表示您接受一切無法解釋的現象與幽默邏輯。
          </p>
        </section>
      </div>
    );
  }
  