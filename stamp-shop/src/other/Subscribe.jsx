import React from 'react'

function Subscribe() {
    const [form, setForm] = React.useState({
        type: "",
        thematic: 0,
        postage: 0,
        annual: 0,
        maxCard: 0,
        newIssues: 0,
        pack: 0,
        frequency: "",
        mode: ""
    });

    const onSubmit = (e) => {
        e.preventDefault();
        alert("Logged in successfully!");
        console.log(form);
    }
    const validForm = () => {
        return form.type && form.frequency && form.mode;
    }
    return (
        <div className="container mt-5 mb-5">
            <form onSubmit={onSubmit} className="p-4 bg-white border rounded">

                <h2 className="text-center">
                    Subscription
                </h2>

                <p className="text-center text-muted mb-4">
                    The subscription allows you to receive, at intervals you choose in advance (per issue, quarterly, semi-annually, or annually), the quantity of our products that you select.
                    To subscribe, simply fill out the following form and pay the subscription fee in advance.
                </p>


                <div className="mb-3">
                    <label className="form-label fw-bold d-block mb-2">Subscription Type *</label>
                    <div className="form-check"><input type="radio" className="form-check-input" name="type" value="100" checked={form.type == '100'} onChange={(e) => setForm({ ...form, type: e.target.value })} />
                        <label className="form-check-label"> 100,000 TND</label></div>
                    <div className="form-check"><input type="radio" className="form-check-input" name="type" value="300" checked={form.type == '300'} onChange={(e) => setForm({ ...form, type: e.target.value })} />
                        <label className="form-check-label"> 300,000 TND</label></div>
                    <div className="form-check"><input type="radio" className="form-check-input" name="type" value="500" checked={form.type == '500'} onChange={(e) => setForm({ ...form, type: e.target.value })} />
                        <label className="form-check-label"> 500,000 TND</label></div>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold d-block mb-2">Product Categories *</label>
                    <div className="d-flex align-items-center mb-2">
                        <label className="me-2" style={{ width: '200px' }}>Thematic stamp collections</label>
                        <input type="number" className="form-control form-control-sm" style={{ width: '60px' }} min="0"
                            value={form.thematic}
                            onChange={e => setForm({ ...form, thematic: e.target.value })} />
                    </div>
                    <div className="d-flex align-items-center mb-2">
                        <label className="me-2" style={{ width: '200px' }}>Postage stamps for mailing</label>
                        <input type="number" className="form-control form-control-sm" style={{ width: '60px' }} min="0"
                            value={form.postage}
                            onChange={e => setForm({ ...form, postage: e.target.value })} />
                    </div>
                    <div className="d-flex align-items-center mb-2">
                        <label className="me-2" style={{ width: '200px' }}>Annual stamp collection</label>
                        <input type="number" className="form-control form-control-sm" style={{ width: '60px' }} min="0"
                            value={form.annual}
                            onChange={e => setForm({ ...form, annual: e.target.value })} />
                    </div>
                    <div className="d-flex align-items-center mb-2">
                        <label className="me-2" style={{ width: '200px' }}>Maximum card</label>
                        <input type="number" className="form-control form-control-sm" style={{ width: '60px' }} min="0"
                            value={form.maxCard}
                            onChange={e => setForm({ ...form, maxCard: e.target.value })} />
                    </div>
                    <div className="d-flex align-items-center mb-2">
                        <label className="me-2" style={{ width: '200px' }}>New issues</label>
                        <input type="number" className="form-control form-control-sm" style={{ width: '60px' }} min="0"
                            value={form.newIssues}
                            onChange={e => setForm({ ...form, newIssues: e.target.value })} />
                    </div>
                    <div className="d-flex align-items-center mb-2">
                        <label className="me-2" style={{ width: '200px' }}>Philatelic pack</label>
                        <input type="number" className="form-control form-control-sm" style={{ width: '60px' }} min="0"
                            value={form.pack}
                            onChange={e => setForm({ ...form, pack: e.target.value })} />
                    </div>
                </div>



                <div className="mb-3 d-flex flex-column">
                    <label className="form-label fw-bold d-block mb-2">Delivery frequency *</label>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" name="frequency" value="issue" checked={form.frequency == "issue"} onChange={(e) => setForm({ ...form, frequency: e.target.value })} />
                        <label className="form-check-label">Per issue</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" name="frequency" value="quarterly" checked={form.frequency == "quarterly"} onChange={(e) => setForm({ ...form, frequency: e.target.value })} />
                        <label className="form-check-label">Quarterly</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" name="frequency" value="semi-annual" checked={form.frequency == "semi-annual"} onChange={(e) => setForm({ ...form, frequency: e.target.value })} />
                        <label className="form-check-label">Semi-annually</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" name="frequency" value="annual" checked={form.frequency == "annual"} onChange={(e) => setForm({ ...form, frequency: e.target.value })} />
                        <label className="form-check-label">Annually</label>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold d-block mb-2">Delivery mode *</label>
                    <select className="form-select" value={form.mode} onChange={e => setForm({ ...form, mode: e.target.value })}>
                        <option value="" disabled>Select a mode</option>
                        <option value="32">International express mail (32,000 TND included)</option>
                        <option value="39">International express mail (39,000 TND included)</option>
                        <option value="51">International express mail (51,000 TND included)</option>
                        <option value="5">Rapid post express mail within Tunisia (5,000 TND included)</option>
                        <option value="5">Registered mail within Tunisia (5,000 TND included)</option>
                        <option value="22">Registered mail outside Tunisia (22,000 TND included)</option>
                    </select>
                </div>

                <button className="btn btn-dark w-100 mt-2" disabled={!validForm()}>
                    Subscribe
                </button>

            </form>
        </div>
    )
}

export default Subscribe