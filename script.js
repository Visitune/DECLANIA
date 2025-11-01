document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const formSections = document.querySelectorAll('.section');
    const stepperItems = document.querySelectorAll('#stepper-nav li');
    
    let currentStep = 1;
    const totalSteps = formSections.length;

    function updateFormView() {
        // Hide all sections
        formSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the current section
        const currentSection = document.getElementById(`section-${currentStep}`);
        if (currentSection) {
            currentSection.classList.add('active');
        }
        
        // Update stepper
        stepperItems.forEach(item => {
            item.classList.remove('active');
            if (parseInt(item.dataset.step) === currentStep) {
                item.classList.add('active');
            }
        });
        
        // Update button visibility
        if (currentStep === 1) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
        }
        
        if (currentStep === totalSteps) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'flex';
        }
    }

    function validateStep(step) {
        const currentSection = document.getElementById(`section-${step}`);
        const inputs = currentSection.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value) {
                input.classList.add('invalid');
                isValid = false;
            } else {
                input.classList.remove('invalid');
            }
        });

        return isValid;
    }

    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep) && currentStep < totalSteps) {
            currentStep++;
            updateFormView();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateFormView();
        }
    });

    // Initial view setup
    updateFormView();

    // Section 3: Composition table logic
    const addCompositionBtn = document.getElementById('add-composition-btn');
    const compositionTbody = document.getElementById('composition-tbody');
    const compositionRowTemplate = document.getElementById('composition-row-template');

    function updateLayerNumbers() {
        const rows = compositionTbody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            const layerNumberInput = row.querySelector('.layer-number');
            if (layerNumberInput) {
                layerNumberInput.value = index + 1;
            }
        });
    }

    addCompositionBtn.addEventListener('click', () => {
        const newRow = compositionRowTemplate.content.cloneNode(true);
        compositionTbody.appendChild(newRow);
        updateLayerNumbers();
    });

    compositionTbody.addEventListener('click', (e) => {
        if (e.target.closest('.remove-row-btn')) {
            e.target.closest('tr').remove();
            updateLayerNumbers();
        }
    });

    // Section 4: Functional Barrier Logic
    const noBfConcernedCheckbox = document.getElementById('no-bf-concerned');
    const bfFields = document.getElementById('bf-fields');
    const bfOtherMaterialCheckbox = document.getElementById('bf-other-material');
    const bfOtherDetails = document.getElementById('bf-other-details');

    noBfConcernedCheckbox.addEventListener('change', () => {
        if (noBfConcernedCheckbox.checked) {
            bfFields.style.display = 'none';
        } else {
            bfFields.style.display = 'block';
        }
    });

    bfOtherMaterialCheckbox.addEventListener('change', () => {
        if (bfOtherMaterialCheckbox.checked) {
            bfOtherDetails.style.display = 'block';
        } else {
            bfOtherDetails.style.display = 'none';
        }
    });

    // Section 5: Usage Conditions Logic
    const infantYesRadio = document.getElementById('infant-yes');
    const infantNoRadio = document.getElementById('infant-no');
    const infantMgInfo = document.getElementById('infant-mg-info');
    const allFoodTypesCheckbox = document.getElementById('all-food-types');
    const foodTypeCheckboxes = document.querySelectorAll('input[name="food-type[]"]');
    const alcoholicCheckbox = document.getElementById('ft-alcoholic');
    const alcoholDegreeDiv = document.getElementById('alcohol-degree');
    const fattyCheckbox = document.getElementById('ft-fatty');
    const frtmgInfoDiv = document.getElementById('frtmg-info');
    const frozenCheckbox = document.getElementById('ft-frozen');
    const frozenDetailsDiv = document.getElementById('frozen-details');
    const svRatioTypeSelect = document.getElementById('sv-ratio-type');
    const svCustomField = document.getElementById('sv-custom-field');

    infantYesRadio.addEventListener('change', () => {
        if (infantYesRadio.checked) {
            infantMgInfo.style.display = 'block';
        }
    });

    infantNoRadio.addEventListener('change', () => {
        if (infantNoRadio.checked) {
            infantMgInfo.style.display = 'none';
        }
    });

    allFoodTypesCheckbox.addEventListener('change', () => {
        foodTypeCheckboxes.forEach(checkbox => {
            checkbox.disabled = allFoodTypesCheckbox.checked;
            if (allFoodTypesCheckbox.checked) {
                checkbox.checked = false;
            }
        });
    });

    alcoholicCheckbox.addEventListener('change', () => {
        alcoholDegreeDiv.style.display = alcoholicCheckbox.checked ? 'block' : 'none';
    });

    fattyCheckbox.addEventListener('change', () => {
        frtmgInfoDiv.style.display = fattyCheckbox.checked ? 'block' : 'none';
    });

    frozenCheckbox.addEventListener('change', () => {
        frozenDetailsDiv.style.display = frozenCheckbox.checked ? 'block' : 'none';
    });

    svRatioTypeSelect.addEventListener('change', () => {
        svCustomField.style.display = svRatioTypeSelect.value === 'custom' ? 'block' : 'none';
    });

    // Section 6: Regulation Logic
    const addReglementationBtn = document.getElementById('add-reglementation-btn');
    const reglementationTbody = document.getElementById('reglementation-tbody');
    const reglementationRowTemplate = document.getElementById('reglementation-row-template');
    const noSpecialMaterialCheckbox = document.getElementById('no-special-material');
    const specialMaterialsFields = document.getElementById('special-materials-fields');
    const specialActiveCheckbox = document.getElementById('special-active');
    const activeMaterialDetails = document.getElementById('active-material-details');
    const specialRecycledPlasticCheckbox = document.getElementById('special-recycled-plastic');
    const recycledPlasticDetails = document.getElementById('recycled-plastic-details');
    const specialRecycledOtherCheckbox = document.getElementById('special-recycled-other');
    const recycledOtherDetails = document.getElementById('recycled-other-details');

    addReglementationBtn.addEventListener('click', () => {
        const newRow = reglementationRowTemplate.content.cloneNode(true);
        reglementationTbody.appendChild(newRow);
    });

    reglementationTbody.addEventListener('click', (e) => {
        if (e.target.closest('.remove-row-btn')) {
            e.target.closest('tr').remove();
        }
    });

    noSpecialMaterialCheckbox.addEventListener('change', () => {
        specialMaterialsFields.style.display = noSpecialMaterialCheckbox.checked ? 'none' : 'block';
    });

    specialActiveCheckbox.addEventListener('change', () => {
        activeMaterialDetails.style.display = specialActiveCheckbox.checked ? 'block' : 'none';
    });

    specialRecycledPlasticCheckbox.addEventListener('change', () => {
        recycledPlasticDetails.style.display = specialRecycledPlasticCheckbox.checked ? 'block' : 'none';
    });

    specialRecycledOtherCheckbox.addEventListener('change', () => {
        recycledOtherDetails.style.display = specialRecycledOtherCheckbox.checked ? 'block' : 'none';
    });

    // Section 7: Substances & Analyses Logic

    // 7.1 Migration Globale
    const addMgBtn = document.getElementById('add-mg-btn');
    const migrationGlobaleTbody = document.getElementById('migration-globale-tbody');
    const mgRowTemplate = document.getElementById('mg-row-template');

    addMgBtn.addEventListener('click', () => {
        const newRow = mgRowTemplate.content.cloneNode(true);
        migrationGlobaleTbody.appendChild(newRow);
    });

    migrationGlobaleTbody.addEventListener('click', (e) => {
        if (e.target.closest('.remove-row-btn')) {
            e.target.closest('tr').remove();
        }
    });

    // 7.2 Substances à Restriction
    const addRestrictionBtn = document.getElementById('add-restriction-btn');
    const restrictionsTbody = document.getElementById('restrictions-tbody');
    const restrictionRowTemplate = document.getElementById('restriction-row-template');

    addRestrictionBtn.addEventListener('click', () => {
        const newRow = restrictionRowTemplate.content.cloneNode(true);
        restrictionsTbody.appendChild(newRow);
    });

    restrictionsTbody.addEventListener('click', (e) => {
        if (e.target.closest('.remove-row-btn')) {
            e.target.closest('tr').remove();
        }
    });

    // 7.3 Additifs Double Usage
    const addDuaBtn = document.getElementById('add-dua-btn');
    const duaTbody = document.getElementById('dua-tbody');
    const duaRowTemplate = document.getElementById('dua-row-template');

    addDuaBtn.addEventListener('click', () => {
        const newRow = duaRowTemplate.content.cloneNode(true);
        duaTbody.appendChild(newRow);
    });

    duaTbody.addEventListener('click', (e) => {
        if (e.target.closest('.remove-row-btn')) {
            e.target.closest('tr').remove();
        }
    });

    // 7.4 Substances Non Listées Intentionnellement Ajoutées
    const addNiasListedBtn = document.getElementById('add-nias-listed-btn');
    const niasListedTbody = document.getElementById('nias-listed-tbody');
    const niasListedRowTemplate = document.getElementById('nias-listed-row-template');

    addNiasListedBtn.addEventListener('click', () => {
        const newRow = niasListedRowTemplate.content.cloneNode(true);
        niasListedTbody.appendChild(newRow);
    });

    niasListedTbody.addEventListener('click', (e) => {
        if (e.target.closest('.remove-row-btn')) {
            e.target.closest('tr').remove();
        }
    });

    // 7.5 NIAS
    const addNiasBtn = document.getElementById('add-nias-btn');
    const niasTbody = document.getElementById('nias-tbody');
    const niasRowTemplate = document.getElementById('nias-row-template');

    addNiasBtn.addEventListener('click', () => {
        const newRow = niasRowTemplate.content.cloneNode(true);
        niasTbody.appendChild(newRow);
    });

    niasTbody.addEventListener('click', (e) => {
        if (e.target.closest('.remove-row-btn')) {
            e.target.closest('tr').remove();
        }
    });

    // 7.6 Tests Sensoriels
    const sensoryTestDoneCheckbox = document.getElementById('sensory-test-done');
    const sensoryDetailsDiv = document.getElementById('sensory-details');

    sensoryTestDoneCheckbox.addEventListener('change', () => {
        sensoryDetailsDiv.style.display = sensoryTestDoneCheckbox.checked ? 'block' : 'none';
    });

    // Section 8: Attachments Logic
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');
    let attachedFiles = [];

    fileInput.addEventListener('change', (event) => {
        Array.from(event.target.files).forEach(file => {
            attachedFiles.push(file);
        });
        renderFileList();
    });

    function renderFileList() {
        fileList.innerHTML = '';
        attachedFiles.forEach((file, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = file.name;
            const removeButton = document.createElement('button');
            removeButton.innerHTML = '&times;'; // 'x' icon
            removeButton.classList.add('remove-attached-file');
            removeButton.addEventListener('click', () => {
                attachedFiles.splice(index, 1);
                renderFileList();
            });
            listItem.appendChild(removeButton);
            fileList.appendChild(listItem);
        });
    }

    // Section 9: Signature Pad Logic
    const signaturePadCanvas = document.getElementById('signature-pad');
    const clearSignatureBtn = document.getElementById('clear-signature-btn');
    const signaturePad = new SignaturePad(signaturePadCanvas);

    clearSignatureBtn.addEventListener('click', () => {
        signaturePad.clear();
    });

    const duplicateCompositionBtn = document.getElementById('duplicate-composition-btn');
    duplicateCompositionBtn.addEventListener('click', () => {
        const section = duplicateCompositionBtn.closest('.section');
        const originalTable = document.getElementById('composition-table');
        const newTable = originalTable.cloneNode(true);
        const newTitle = document.createElement('h3');
        newTitle.innerHTML = '<span class="material-symbols-outlined">layers</span> Composition structurelle détaillée (dupliquée)';
        
        const newTbody = newTable.querySelector('tbody');
        newTbody.innerHTML = ''; // Clear the body of the new table
        const newRow = compositionRowTemplate.content.cloneNode(true);
        newTbody.appendChild(newRow);

        section.appendChild(newTitle);
        section.appendChild(newTable);
    });

    // Section 2: Same as declarant checkbox logic
    const sameAsDeclarantCheckbox = document.getElementById('same-as-declarant');
    const fabricantFields = document.getElementById('fabricant-fields');
    const fabricantInputs = fabricantFields.querySelectorAll('input, textarea, select');

    const declarantToFabricantMap = {
        'declarant-siret': 'fabricant-siret',
        'declarant-company': 'fabricant-company',
        'declarant-address': 'fabricant-address',
        'declarant-phone': 'fabricant-phone',
        'declarant-email': 'fabricant-email'
    };

    sameAsDeclarantCheckbox.addEventListener('change', () => {
        if (sameAsDeclarantCheckbox.checked) {
            for (const declarantId in declarantToFabricantMap) {
                const declarantInput = document.getElementById(declarantId);
                const fabricantId = declarantToFabricantMap[declarantId];
                const fabricantInput = document.getElementById(fabricantId);
                if (declarantInput && fabricantInput) {
                    fabricantInput.value = declarantInput.value;
                }
            }
            fabricantInputs.forEach(input => {
                input.disabled = true;
                input.style.backgroundColor = '#e9ecef'; // Visually indicate disabled state
            });
        } else {
            fabricantInputs.forEach(input => {
                input.disabled = false;
                input.value = '';
                input.style.backgroundColor = '';
            });
        }
    });


    // Save and Load Project Logic
    const saveBtn = document.getElementById('save-btn');
    const loadInput = document.getElementById('load-input');

    saveBtn.addEventListener('click', async () => {
        const zip = new JSZip();
        const formData = collectFormData();
        zip.file('form_data.json', JSON.stringify(formData));

        attachedFiles.forEach(file => {
            zip.file(file.name, file);
        });

        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, 'projet-aniadoc.dec');
    });

    loadInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const zip = await JSZip.loadAsync(file);
        const formDataFile = zip.file('form_data.json');

        if (formDataFile) {
            const formData = JSON.parse(await formDataFile.async('string'));
            populateForm(formData);
        }

        const files = zip.filter((relativePath, file) => !file.dir && relativePath !== 'form_data.json');
        attachedFiles = [];
        for (const file of files) {
            const blob = await file.async('blob');
            const newFile = new File([blob], file.name, { type: blob.type });
            attachedFiles.push(newFile);
        }
        renderFileList();
    });

    function populateForm(data) {
        const form = document.getElementById('declaration-form');
        const inputs = form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            if (data[input.name]) {
                if (input.type === 'checkbox') {
                    input.checked = data[input.name].includes(input.value);
                } else if (input.type === 'radio') {
                    input.checked = data[input.name] === input.value;
                } else {
                    input.value = data[input.name];
                }
            } else if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = false;
            }
        });

        // Trigger change events for conditional logic
        document.getElementById('same-as-declarant').dispatchEvent(new Event('change'));
        document.getElementById('no-bf-concerned').dispatchEvent(new Event('change'));
        document.getElementById('infant-yes').dispatchEvent(new Event('change'));
        document.getElementById('infant-no').dispatchEvent(new Event('change'));
        document.getElementById('all-food-types').dispatchEvent(new Event('change'));
        document.getElementById('ft-alcoholic').dispatchEvent(new Event('change'));
        document.getElementById('ft-fatty').dispatchEvent(new Event('change'));
        document.getElementById('ft-frozen').dispatchEvent(new Event('change'));
        document.getElementById('sv-ratio-type').dispatchEvent(new Event('change'));
        document.getElementById('no-special-material').dispatchEvent(new Event('change'));
        document.getElementById('special-active').dispatchEvent(new Event('change'));
        document.getElementById('special-recycled-plastic').dispatchEvent(new Event('change'));
        document.getElementById('special-recycled-other').dispatchEvent(new Event('change'));
        document.getElementById('sensory-test-done').dispatchEvent(new Event('change'));

        // Populate tables
        const populateTable = (tbody, template, data) => {
            tbody.innerHTML = '';
            if (data) {
                data.forEach(rowData => {
                    const newRow = template.content.cloneNode(true);
                    for (const key in rowData) {
                        const input = newRow.querySelector(`.${key}`);
                        if (input) {
                            input.value = rowData[key];
                        }
                    }
                    tbody.appendChild(newRow);
                });
            }
        };

        populateTable(compositionTbody, compositionRowTemplate, data['composition-table']);
        updateLayerNumbers();
        populateTable(reglementationTbody, reglementationRowTemplate, data['reglementation-table']);
        populateTable(migrationGlobaleTbody, mgRowTemplate, data['migration-globale-table']);
        populateTable(restrictionsTbody, restrictionRowTemplate, data['restrictions-table']);
        populateTable(duaTbody, duaRowTemplate, data['dua-table']);
        populateTable(niasListedTbody, niasListedRowTemplate, data['nias-listed-table']);
        populateTable(niasTbody, niasRowTemplate, data['nias-table']);

        if (data.signature) {
            signaturePad.fromDataURL(data.signature);
        }
    }

    // PDF Generation Logic
    const finishBtn = document.getElementById('finish-btn');
    const pdfPreviewModal = document.getElementById('pdf-preview-modal');
    const pdfIframe = document.getElementById('pdf-iframe');
    const closePreviewBtn = document.getElementById('close-preview-btn');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const loader = document.getElementById('loader');

    finishBtn.addEventListener('click', async () => {
        loader.style.display = 'inline-block';
        const formData = collectFormData();
        const pdf = await generatePdf(formData);
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        pdfIframe.src = pdfUrl;
        pdfPreviewModal.style.display = 'flex';
        loader.style.display = 'none';

        downloadPdfBtn.onclick = () => {
            pdf.save('Declaration_Conformite_ANIA.pdf');
        };
    });

    closePreviewBtn.addEventListener('click', () => {
        pdfPreviewModal.style.display = 'none';
        pdfIframe.src = ''; // Clear the iframe
    });

    function collectFormData() {
        const data = {};
        const form = document.getElementById('declaration-form');
        const inputs = form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            if (input.name) {
                if (input.type === 'checkbox') {
                    if (!data[input.name]) {
                        data[input.name] = [];
                    }
                    if (input.checked) {
                        data[input.name].push(input.value);
                    }
                } else if (input.type === 'radio') {
                    if (input.checked) {
                        data[input.name] = input.value;
                    }
                } else {
                    data[input.name] = input.value;
                }
            }
        });

        // Collect table data
        data['composition-table'] = Array.from(compositionTbody.querySelectorAll('tr')).map(row => ({
            number: row.querySelector('.layer-number')?.value,
            type: row.querySelector('.layer-type')?.value,
            thickness: row.querySelector('.layer-thickness')?.value,
            info: row.querySelector('.layer-info')?.value
        }));

        data['reglementation-table'] = Array.from(reglementationTbody.querySelectorAll('tr')).map(row => ({
            materialType: row.querySelector('.reg-material-type')?.value,
            textRef: row.querySelector('.reg-text-ref')?.value,
            country: row.querySelector('.reg-country')?.value
        }));

        data['migration-globale-table'] = Array.from(migrationGlobaleTbody.querySelectorAll('tr')).map(row => ({
            simulant: row.querySelector('.mg-simulant')?.value,
            duration: row.querySelector('.mg-duration')?.value,
            temperature: row.querySelector('.mg-temperature')?.value,
            result: row.querySelector('.mg-result')?.value,
            conformity: row.querySelector('.mg-conformity')?.value
        }));

        data['restrictions-table'] = Array.from(restrictionsTbody.querySelectorAll('tr')).map(row => ({
            name: row.querySelector('.restriction-name')?.value,
            cas: row.querySelector('.restriction-cas')?.value,
            limit: row.querySelector('.restriction-limit')?.value,
            textRef: row.querySelector('.restriction-text')?.value,
            method: row.querySelector('.restriction-method')?.value
        }));

        data['dua-table'] = Array.from(duaTbody.querySelectorAll('tr')).map(row => ({
            name: row.querySelector('.dua-name')?.value,
            eNum: row.querySelector('.dua-num')?.value,
            cas: row.querySelector('.dua-cas')?.value,
            quantity: row.querySelector('.dua-quantity')?.value
        }));

        data['nias-listed-table'] = Array.from(niasListedTbody.querySelectorAll('tr')).map(row => ({
            name: row.querySelector('.nias-listed-name')?.value,
            id: row.querySelector('.nias-listed-id')?.value,
            ref: row.querySelector('.nias-listed-ref')?.value,
            qty: row.querySelector('.nias-listed-qty')?.value
        }));

        data['nias-table'] = Array.from(niasTbody.querySelectorAll('tr')).map(row => ({
            name: row.querySelector('.nias-name')?.value,
            id: row.querySelector('.nias-id')?.value,
            comments: row.querySelector('.nias-comments')?.value
        }));

        // Signature
        if (!signaturePad.isEmpty()) {
            data['signature'] = signaturePad.toDataURL();
        }

        // Attached files (only names for now, actual files handled separately)
        data['attached-files'] = attachedFiles.map(file => file.name);

        return data;
    }

    async function generatePdf(formData) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'pt', 'a4');
        const pageHeight = doc.internal.pageSize.height;
        let y = 40;

        const addHeader = () => {
            if (typeof aniaLogo !== 'undefined') {
                doc.addImage(aniaLogo, 'SVG', 40, 20, 80, 40);
            }
            doc.setFontSize(18);
            doc.setFont(undefined, 'bold');
            doc.text('Déclaration de Conformité', 150, 40);
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text('Conforme au Règlement (CE) n°1935/2004', 150, 55);
        };

        const addFooter = () => {
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.text(`Page ${i} sur ${pageCount}`, doc.internal.pageSize.width / 2, pageHeight - 20, { align: 'center' });
            }
        };

        const checkPageBreak = (height) => {
            if (y + height > pageHeight - 40) {
                doc.addPage();
                addHeader();
                y = 40;
            }
        };

        const addSectionTitle = (title) => {
            checkPageBreak(30);
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text(title, 40, y);
            y += 20;
        };

        const addField = (label, value) => {
            if (value) {
                checkPageBreak(20);
                doc.setFontSize(10);
                doc.setFont(undefined, 'bold');
                doc.text(label, 40, y);
                doc.setFont(undefined, 'normal');
                doc.text(value, 150, y, { maxWidth: 400 });
                y += 20 + (doc.getTextDimensions(value, { maxWidth: 400 }).h) - 10;
            }
        };

        addHeader();

        // Section 1
        addSectionTitle('1. Identité de l\'exploitant qui établit la déclaration');
        addField('Signataire:', `${formData['declarant-civility'] || ''} ${formData['declarant-firstname'] || ''} ${formData['declarant-lastname'] || ''}` );
        addField('Société:', formData['declarant-company']);
        addField('Adresse:', formData['declarant-address']);
        addField('Fonction:', formData['declarant-function']);
        addField('SIRET:', formData['declarant-siret']);
        addField('Téléphone:', formData['declarant-phone']);
        addField('Email:', formData['declarant-email']);

        // Section 2
        addSectionTitle('2. Identité de l\'exploitant qui fabrique ou importe le matériau/objet');
        if (formData['same-as-declarant'] && formData['same-as-declarant'].includes('on')) {
            doc.text("Le fabricant/importateur est le même que le déclarant.", 40, y); y += 20;
        } else {
            addField('Type:', formData['fabricant-type']);
            addField('Société:', formData['fabricant-company']);
            addField('Adresse:', formData['fabricant-address']);
            addField('SIRET:', formData['fabricant-siret']);
            addField('Téléphone:', formData['fabricant-phone']);
            addField('Email:', formData['fabricant-email']);
        }

        // Section 3
        addSectionTitle('3. Identification du matériau');
        addField('Description:', formData['material-description']);
        addField('Référence:', formData['material-ref']);
        addField('Lot/Série:', formData['material-batch']);
        addField('Structure:', formData['material-type']);
        if (formData['composition-table'] && formData['composition-table'].length > 0) {
            doc.autoTable({
                startY: y,
                head: [['N° Couche', 'Type', 'Épaisseur (µm)', 'Infos']],
                body: formData['composition-table'].map(r => [r.number, r.type, r.thickness, r.info]),
                theme: 'striped',
                headStyles: { fillColor: [0, 90, 158] },
                didDrawPage: (data) => { y = data.cursor.y; addHeader(); }
            });
            y = doc.autoTable.previous.finalY + 20;
        }

        // Section 4
        addSectionTitle('4. Barrière fonctionnelle');
        if (formData['no-bf-concerned'] && formData['no-bf-concerned'].includes('on')) {
            doc.text("Non concerné par une barrière fonctionnelle.", 40, y); y += 20;
        } else {
            addField('Type de matériau:', formData['bf-type'] ? formData['bf-type'].join(', ') : '');
            addField('Description barrière:', formData['bf-layer-description']);
            addField('Vérification efficacité:', formData['bf-compliance-test']);
        }

        // Section 5
        addSectionTitle('5. Conditions d\'utilisation');
        addField('Alimentation infantile:', formData['infant-food'] === 'yes' ? 'Oui' : 'Non');
        addField('Types de denrées:', formData['all-food-types'] && formData['all-food-types'].includes('on') ? 'Tous types' : (formData['food-type'] ? formData['food-type'].join(', ') : ''));
        addField('Conditions d\'utilisation:', formData['usage-conditions']);
        addField('Rapport S/V:', formData['sv-ratio-type'] === '6' ? '6 dm²/kg' : formData['sv-ratio-value']);

        // Section 6
        addSectionTitle('6. Références réglementaires');
        addField('Règlements UE:', formData['reg'] ? formData['reg'].join(', ') : '');
        if (formData['reglementation-table'] && formData['reglementation-table'].length > 0) {
            doc.autoTable({
                startY: y,
                head: [['Typologie', 'Texte de référence', 'Pays']],
                body: formData['reglementation-table'].map(r => [r.materialType, r.textRef, r.country]),
                theme: 'striped',
                headStyles: { fillColor: [0, 90, 158] },
                didDrawPage: (data) => { y = data.cursor.y; addHeader(); }
            });
            y = doc.autoTable.previous.finalY + 20;
        }

        // Section 7
        addSectionTitle('7. Substances et Analyses');
        if (formData['migration-globale-table'] && formData['migration-globale-table'].length > 0) {
            doc.text('7.1 Migration globale', 40, y); y+= 15;
            doc.autoTable({
                startY: y,
                head: [['Simulant', 'Durée', 'Température', 'Résultat', 'Conformité']],
                body: formData['migration-globale-table'].map(r => [r.simulant, r.duration, r.temperature, r.result, r.conformity]),
                theme: 'striped',
                headStyles: { fillColor: [0, 90, 158] },
                didDrawPage: (data) => { y = data.cursor.y; addHeader(); }
            });
            y = doc.autoTable.previous.finalY + 20;
        }
        if (formData['restrictions-table'] && formData['restrictions-table'].length > 0) {
            doc.text('7.2 Substances à restriction', 40, y); y+= 15;
            doc.autoTable({
                startY: y,
                head: [['Substance', 'CAS', 'Limite', 'Référence', 'Méthode']],
                body: formData['restrictions-table'].map(r => [r.name, r.cas, r.limit, r.textRef, r.method]),
                theme: 'striped',
                headStyles: { fillColor: [0, 90, 158] },
                didDrawPage: (data) => { y = data.cursor.y; addHeader(); }
            });
            y = doc.autoTable.previous.finalY + 20;
        }

        // Section 8
        addSectionTitle('8. Pièces jointes');
        addField('Fichiers:', formData['attached-files'] ? formData['attached-files'].join(', ') : 'Aucun');

        // Section 9
        addSectionTitle('9. Signature et validité');
        addField('Fait à:', formData['doc-location']);
        addField('Le:', formData['doc-date']);
        if (formData.signature) {
            checkPageBreak(100);
            doc.text('Signature:', 40, y);
            doc.addImage(formData.signature, 'PNG', 40, y + 10, 150, 75);
            y += 100;
        }

        addFooter();
        return doc;
    }
});
