document.addEventListener('DOMContentLoaded', function () {
    const btnCari = document.getElementById("btn_cari");

    if (btnCari) {
        btnCari.addEventListener("click", function (e) {
            e.preventDefault();

            const noDokumenInput = document.getElementById("no_dokumen");
            const noDokumen = noDokumenInput ? noDokumenInput.value.trim() : "";
            const msgError = document.getElementById("msg_error");
            const resultBlock = document.getElementById("result-block");

            if (!noDokumen) {
                alert("Harap masukkan nomor dokumen.");
                return;
            }

            // Fetch data from database via check.php
            // Mock data simulation instead of fetch
            // Check if input matches the default value in HTML
            // Note: The user requested to match the code portion attached in index
            const jenisDokumen = document.getElementById("jenis_dokumen").value;
            if (jenisDokumen === 'icv' && noDokumen === 'E25-0003708163') {
                const d = {
                    nama_pemilik: 'MUHAMMAD AFADIL AL ANSH***',
                    nomor_paspor: 'Passport  X6702628',
                    tanggal_lahir: '1998-07-20',
                    no_dokumen: 'E25-0003708163',
                    jenis_vaksin: 'MENINGITIS MENINGOCOCCUS',
                    tanggal_vaksin: '2026-01-01',
                    valid_until: '2029-01-01',
                    faskes: 'Klinik Utama CT-Klinik',
                    dokter: 'MASAYU PRAKASITA, MD',
                    // Use the image currently in the HTML
                    qr_code: 'https://raw.githubusercontent.com/sinkarkess/subdomain/refs/heads/main/QR/qr-E25-0003708163.png',

                    // Polio data
                    jenis_vaksin2: 'POLIO',
                    tanggal_vaksin2: '2026-01-01',
                    valid_until2: '2027-01-01'
                };

                // Populate fields
                setText('res_nama_pemilik', d.nama_pemilik);
                setText('res_nomor_paspor', d.nomor_paspor);
                setText('res_tanggal_lahir', formatDate(d.tanggal_lahir));
                setText('res_no_dokumen_text', d.no_dokumen);
                setText('res_jenis_vaksin', d.jenis_vaksin);
                setText('res_tanggal_vaksin', formatDate(d.tanggal_vaksin));
                setText('res_valid_until', formatDate(d.valid_until));

                // Update QR Code
                const qrCodeEl = document.getElementById('res_qr_code');
                if (qrCodeEl) {
                    if (d.qr_code) {
                        qrCodeEl.src = d.qr_code;
                    } else {
                        qrCodeEl.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(d.no_dokumen);
                    }
                }

                // Combine faskes and dokter
                const faskesDokter = (d.faskes || '-') + '<br>' + (d.dokter || '-');
                const faskesEl = document.getElementById('res_faskes_dokter');
                if (faskesEl) faskesEl.innerHTML = faskesDokter;

                // Populate Polio Data (Second Table)
                const vaksin2Nama = d.jenis_vaksin2 || 'POLIO';
                const vaksin2Tgl = d.tanggal_vaksin2 || d.tanggal_vaksin;

                setText('res_vaksin2_nama', vaksin2Nama);
                setText('res_vaksin2_tanggal', formatDate(vaksin2Tgl));

                // Batch & Booster can be updated to be dynamic later if needed
                setText('res_vaksin2_batch', 'BIOFARMA 2101924');
                setText('res_vaksin2_booster', formatDate(d.valid_until2 || d.valid_until));

                // Reuse faskes/dokter for Polio
                const faskesEl2 = document.getElementById('res_vaksin2_faskes');
                if (faskesEl2) faskesEl2.innerHTML = faskesDokter;

                if (msgError) msgError.style.display = "none";
                if (resultBlock) {
                    resultBlock.style.display = "block";
                    resultBlock.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Not found
                if (msgError) msgError.style.display = "block";
                if (resultBlock) resultBlock.style.display = "none";
            }
        });
        // Auto-trigger search on page load
        btnCari.click();
    }

    function setText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    function formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString; // Return original if invalid

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        let suffix = 'th';
        if (day % 10 === 1 && day !== 11) suffix = 'st';
        else if (day % 10 === 2 && day !== 12) suffix = 'nd';
        else if (day % 10 === 3 && day !== 13) suffix = 'rd';

        return `${day}${suffix} ${month} ${year}`;
    }
});
