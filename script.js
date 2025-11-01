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
    const saveProgressBtn = document.getElementById('save-progress-btn');
    const loadInput = document.getElementById('load-input');

    async function saveProject() {
        const zip = new JSZip();
        const formData = collectFormData();
        zip.file('form_data.json', JSON.stringify(formData));

        attachedFiles.forEach(file => {
            zip.file(file.name, file);
        });

        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, 'projet-aniadoc.dec');
    }

    saveBtn.addEventListener('click', saveProject);
    saveProgressBtn.addEventListener('click', saveProject);

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

        // Signature (removed)

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
            doc.setFontSize(18);
            doc.setFont(undefined, 'bold');
            doc.text('Déclaration de Conformité', 150, 40);
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text('Conforme au Règlement (CE) n°1935/2004', 150, 55);
            return 70; // New starting y for content
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
                y = addHeader(); // Update y with the returned value
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
                const textHeight = doc.getTextDimensions(value, { maxWidth: 400 }).h;
                checkPageBreak(textHeight + 10); // Add some padding
                doc.setFontSize(10);
                doc.setFont(undefined, 'bold');
                doc.text(label, 40, y);
                doc.setFont(undefined, 'normal');
                doc.text(value, 150, y, { maxWidth: 400 });
                y += textHeight + 10; // Consistent spacing
            }
        };

        const addParagraph = (text) => {
            const textHeight = doc.getTextDimensions(text, { maxWidth: 500 }).h;
            checkPageBreak(textHeight + 10); // Check page break for the text
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text(text, 40, y, { maxWidth: 500, lineHeightFactor: 1.2 });
            y += textHeight + 10;
        };

        y = addHeader();

        addParagraph('Le présent modèle de déclaration de conformité, proposée par la plateforme PAE et accompagnée d’une notice explicative disponible sur le site internet de l’ANIA, est mise à disposition à titre purement indicatif. Son objectif est de faciliter les relations entre fournisseurs et acheteurs de matériaux, d’emballages et d’objets (hors équipements) entrant ou susceptibles d’entrer en contact avec des denrées alimentaires. Ce modèle vise à les éclairer dans leur démarche de mise en conformité aux obligations prévues par les articles 3 et 16 du règlement (CE) n°1935/2004 et dans les textes spécifiques pertinents (voir partie 5).');
        addParagraph('Conformément aux principes du droit de la concurrence, chaque entreprise reste pleinement libre d’adopter, de modifier ou de remplacer ce modèle par un document de sa propre conception, selon ses besoins et sa situation particulière. L’utilisation de ce modèle est strictement facultative et n’est en aucun cas imposée par la plateforme PAE ou toute autre entité.');
        addParagraph('Chaque déclarant est responsable des déclarations réalisées sachant qu’en aucun cas la responsabilité de la plateforme ne saurait être engagée.');

        // Section 1
        addSectionTitle('1. Identité de l\'exploitant qui établit la déclaration');
        addField('Madame / Monsieur :', `${formData['declarant-civility'] || ''} ${formData['declarant-firstname'] || ''} ${formData['declarant-lastname'] || ''}`);
        addField('Fonction :', formData['declarant-function']);
        addField('Nom et adresse de la Société :', `${formData['declarant-company'] || ''}\n${formData['declarant-address'] || ''}`);

        // Section 2
        addSectionTitle('2. Identité de l\'exploitant qui fabrique ou importe le matériau et/ou l\'objet faisant l\'objet de la déclaration (si différent)');
        if (formData['same-as-declarant'] && formData['same-as-declarant'].includes('on')) {
            addParagraph("Le fabricant/importateur est le même que le déclarant.");
        } else {
            addField('Nom et adresse de la Société :', `${formData['fabricant-company'] || ''}\n${formData['fabricant-address'] || ''}`);
            addParagraph(`Préciser : ${formData['fabricant-type'] || ''}`);
        }

        // Section 3
        addSectionTitle('3. Identification du matériau et/ou objet faisant l\'objet de la déclaration');
        addField('Description', formData['material-description']);
        addField('Référence(s) commerciale(s) ou client :', formData['material-ref']);
        addParagraph('Composition structurelle détaillée :');
        if (formData['composition-table'] && formData['composition-table'].length > 0) {
            doc.autoTable({
                startY: y,
                head: [['N° Couche', 'Type de matériau/Description', 'Épaisseur (µm)', 'Informations complémentaires']],
                body: formData['composition-table'].map(r => [r.number, r.type, r.thickness, r.info]),
                theme: 'striped',
                headStyles: { fillColor: [0, 90, 158] },
                didDrawPage: (data) => { y = data.cursor.y; if (data.pageNumber > 1) addHeader(); }
            });
            y = doc.autoTable.previous.finalY + 20;
        }
        addField('Montage de l’emballage (collage, soudure, assemblage) :', formData['material-assembly']);

        // Section 4
        addSectionTitle('4. Barrière fonctionnelle (dans le cas des matériaux multicouches)');
        if (formData['no-bf-concerned'] && formData['no-bf-concerned'].includes('on')) {
            addParagraph("Non concerné par une barrière fonctionnelle.");
        } else {
            if (formData['bf-type'] && formData['bf-type'].length > 0) addParagraph(`Type de matériau avec barrière fonctionnelle : ${formData['bf-type'].join(', ')}`);
            if (formData['bf-only-behind'] && formData['bf-only-behind'].includes('on')) addParagraph('Le matériau faisant l\'objet de cette déclaration doit être utilisé UNIQUEMENT derrière une barrière fonctionnelle');
            if (formData['bf-other-material'] && formData['bf-other-material'].includes('on')) addField('Autres matériaux avec barrière', formData['bf-other-description']);
            addField('Description de la couche barrière fonctionnelle', formData['bf-layer-description']);
            addField('Vérification de l\'efficacité de la barrière', formData['bf-compliance-test']);
        }

        // Section 5
        addSectionTitle('5. Informations relatives à l\'utilisation finale du matériau ou de l\'objet');
        addField('Matériau ou objet destiné à l\"alimentation infantile', formData['infant-food'] === 'yes' ? '• Oui' : '• Non');
        addParagraph('Type de denrée alimentaire destinée à être mise en contact :');
        if (formData['all-food-types'] && formData['all-food-types'].includes('on')) {
            doc.text('• Tous types de denrées', 40, y); y += 20;
        } else {
            if (formData['food-type'] && formData['food-type'].includes('dry')) {
                doc.text('• Denrées sèches et assimilées', 40, y); y += 20;
            }
            if (formData['food-type'] && formData['food-type'].includes('aqueous')) {
                doc.text('• Denrées humides/produits aqueux', 40, y); y += 20;
            }
            if (formData['food-type'] && formData['food-type'].includes('acidic')) {
                doc.text('• Denrées acides (ph ≤ 4,5)', 40, y); y += 20;
            }
            if (formData['food-type'] && formData['food-type'].includes('alcoholic')) {
                addField('• Denrées alcooliques – Préciser le degré d’alcool :', formData['alcohol-degree']);
            }
            if (formData['food-type'] && formData['food-type'].includes('frozen')) {
                addField('• Denrées congelées et surgelées - Préciser si les denrées sont congelées/surgelées dans leurs emballages ou hors de leurs emballages, et si elles sont destinées à être décongelées dans ou hors de leurs emballages :', formData['frozen-conditions']);
            }
            if (formData['food-type'] && formData['food-type'].includes('fatty')) {
                addParagraph('• Denrées grasses :');
                addParagraph('Si le matériau et/ou objet soumis au Règlement (UE) n°10/2011 est concerné par l’application d’un facteur de réduction, le mentionner :');
                if (formData['frtmg-applied'] && formData['frtmg-applied'].includes('on')) {
                    doc.text('• Facteur de Réduction lié à la Teneur en Matière Grasse (FRTMG)', 40, y); y += 20;
                }
                if (formData['simulant-d2-applied'] && formData['simulant-d2-applied'].includes('on')) {
                    doc.text('• Facteur de réduction lié au simulant D2', 40, y); y += 20;
                }
            }
            addField('• Autres (préciser) :', formData['other-food-types']);
        }
        addParagraph('Conditions normales et prévisibles de contact (durée et température)');
        addField('Préciser', formData['usage-conditions']);
        addParagraph('Rapport maximal (Surface en contact avec la denrée alimentaire) / (Volume/poids de la denrée) utilisé pour établir la conformité du matériau ou de l’objet :');
        if (formData['sv-ratio-type'] === '6') {
            doc.text('• 6dm²/kg d\'aliment', 40, y); y += 20;
        } else if (formData['sv-ratio-type'] === 'custom') {
            addField('• Autre :', formData['sv-ratio-value']);
        }

        // Section 6
        addSectionTitle('5. Références réglementaires');
        addParagraph('Le matériau et/ou objet qui fait l’objet de cette déclaration est conforme aux exigences du règlement cadre (CE) n°1935/2004/CE, du règlement (CE) n°2023/2006 (et tout autre texte réglementaire pertinent). Tout matériau ou objet relevant du champ d’application du Règlement (UE) 2024/3190 est conforme aux exigences de celui-ci.');
        addParagraph('Citer le(s) autres texte(s) concerné(s) par type de matériau et par pays :');
        if (formData['reglementation-table'] && formData['reglementation-table'].length > 0) {
            doc.autoTable({
                startY: y,
                head: [['Typologie des matières (encres, colles, papier-carton, plastique, vernis…)', 'Textes réglementaires et Textes de référence (résolution, recommandation, Guidelines EuPIA, FEICA, fiches des autorités…)', 'Europe / Etat membre']],
                body: formData['reglementation-table'].map(r => [r.materialType, r.textRef, r.country]),
                theme: 'striped',
                headStyles: { fillColor: [0, 90, 158] },
                didDrawPage: (data) => { y = data.cursor.y; addHeader(); }
            });
            y = doc.autoTable.previous.finalY + 20;
        }
        addParagraph('Matériaux particuliers (matériaux recyclés, matériaux actifs ou intelligents)');
        if (formData['no-special-material'] && formData['no-special-material'].includes('on')) {
            doc.text('• Non concerné', 40, y); y += 20;
        } else {
            if (formData['special-material'] && formData['special-material'].includes('active')) {
                addField('• Règlement (CE) n°450/2009 concernant la présence de matériaux actifs ou intelligents, préciser la substance utilisée et le numéro mentionné dans le registre européen :', formData['active-substance-details']);
            }
            if (formData['special-material'] && formData['special-material'].includes('recycled-plastic')) {
                addField('• Règlement (UE) n°2022/1616 concernant la présence de matériaux recyclés dans les matériaux et objets plastiques et joindre la déclaration de conformité conformément au règlement n° 2022/1616.', formData['recycled-plastic-details']);
            }
            if (formData['special-material'] && formData['special-material'].includes('recycled-other')) {
                addField('• Autres matériaux (recyclés autres que plastique, etc.) :', formData['recycled-other-details']);
            }
        }

        // Section 7
        addSectionTitle('6. Informations relatives au matériau et/ou objet faisant l’objet de la déclaration');
        addParagraph('Cette déclaration de conformité a été établie au vu des éléments suivants (cocher la ou les cases correspondantes) : ');
        if (formData['doc-basis'] && formData['doc-basis'].includes('supplier-declarations')) {
            doc.text('• Déclarations des fournisseurs de matières premières (composant le matériau/objet)', 40, y); y += 20;
        }
        if (formData['doc-basis'] && formData['doc-basis'].includes('global-migration')) {
            doc.text('• Analyses de migration globale (si concerné complétez le tableau 6.1)', 40, y); y += 20;
        }
        if (formData['doc-basis'] && formData['doc-basis'].includes('restricted-substances')) {
            doc.text('• Substances soumises à restriction (si concerné complétez le tableau 6.2)', 40, y); y += 20;
        }
        if (formData['doc-basis'] && formData['doc-basis'].includes('dua')) {
            doc.text('• Informations sur les additifs à double usage (si concerné complétez le tableau 6.3)', 40, y); y += 20;
        }
        if (formData['doc-basis'] && formData['doc-basis'].includes('nias-listed')) {
            doc.text('• Evaluation des substances non listées intentionnellement ajoutées (si concerné complétez le tableau 6.4)', 40, y); y += 20;
        }
        if (formData['doc-basis'] && formData['doc-basis'].includes('nias')) {
            doc.text('• Evaluation des substances non intentionnellement ajoutées (si concerné complétez le tableau 6.5)', 40, y); y += 20;
        }
        if (formData['doc-basis'] && formData['doc-basis'].includes('sensory')) {
            doc.text('• Test(s) sensoriel(s) (complétez le point 6.6)', 40, y); y += 20;
        }

        addSectionTitle('6.1 Analyse de migration globale');
        if (formData['migration-globale-table'] && formData['migration-globale-table'].length > 0) {
            doc.autoTable({
                startY: y,
                head: [['Simulant', 'Durée', 'Température', 'Résultat', 'Conforme / Non-conforme']],
                body: formData['migration-globale-table'].map(r => [r.simulant, r.duration, r.temperature, r.result, r.conformity]),
                theme: 'striped',
                headStyles: { fillColor: [0, 90, 158] },
                didDrawPage: (data) => { y = data.cursor.y; addHeader(); }
            });
            y = doc.autoTable.previous.finalY + 20;
        }

        addSectionTitle('6.2 Informations sur les substances soumises à restriction (pureté, LMS, etc. - se référer à la notice pour l’explicitation de ces substances)');
        addParagraph('Préciser ci-après la (ou les) substance(s) sujette(s) à restriction et la (ou les) limite(s) admissible(s)');
        if (formData['restrictions-table'] && formData['restrictions-table'].length > 0) {
            doc.autoTable({
                startY: y,
                head: [['Noms', 'Identification Numéro ref. CEE ou CAS', 'Limites (Préciser l’unité et le type de limite)', 'Texte de référence', 'A*', 'W*', 'C*', 'M*']],
                body: formData['restrictions-table'].map(r => [r.name, r.cas, r.limit, r.textRef, r.method === 'A' ? 'X' : '', r.method === 'W' ? 'X' : '', r.method === 'C' ? 'X' : '', r.method === 'M' ? 'X' : '']),
                theme: 'striped',
                headStyles: { fillColor: [0, 90, 158] },
                didDrawPage: (data) => { y = data.cursor.y; addHeader(); }
            });
            y = doc.autoTable.previous.finalY + 20;
        }
        addParagraph('* le respect de ces limites a été établi par : cochez la case correspondante analyse (A), Worst case (W), calcul (C) ou modélisation (M) : obligation induite (article 16 du Règlement (UE) 10/2011)');
        addField('En cas de réalisation de tests, préciser les simulants et conditions de test :', formData['restrictions-test-conditions']);
        addField('Si non rempli, préciser les raisons - renvoyer aux documents de référence :', formData['restrictions-not-filled-reason']);

        addSectionTitle('6.3 Informations sur les additifs à double usage');
        addParagraph('• Si concerné, préciser ci-dessous la (ou les) substance(s) concernée(s) :');
        if (formData['dua-table'] && formData['dua-table'].length > 0) {
            doc.autoTable({
                startY: y,
                head: [['Noms', 'Identification : numéro E ou FL', 'N°CAS', 'Optionnel : Teneurs mises en œuvre']],
                body: formData['dua-table'].map(r => [r.name, r.eNum, r.cas, r.quantity]),
                theme: 'striped',
                headStyles: { fillColor: [0, 90, 158] },
                didDrawPage: (data) => { y = data.cursor.y; addHeader(); }
            });
            y = doc.autoTable.previous.finalY + 20;
        }

        addSectionTitle('6.4 Evaluation des substances non listées intentionnellement ajoutées');
        if (formData['nias-listed-eval-done'] && formData['nias-listed-eval-done'].includes('on')) {
            doc.text('• Evaluation des risques (Article 3 du Règlement (CE) n° 1935/2004) effectuée', 40, y); y += 20;
        } else {
            addParagraph('• A défaut, lister les substances et informations pertinentes pour l’évaluation des risques');
            if (formData['nias-listed-table'] && formData['nias-listed-table'].length > 0) {
                doc.autoTable({
                    startY: y,
                    head: [['Nom', 'Identification CAS - EINECS – N° de Référence MCDA', 'Texte de référence', 'Quantité max. (%) dans matériau, emballage ou objet']],
                    body: formData['nias-listed-table'].map(r => [r.name, r.id, r.ref, r.qty]),
                    theme: 'striped',
                    headStyles: { fillColor: [0, 90, 158] },
                    didDrawPage: (data) => { y = data.cursor.y; addHeader(); }
                });
                y = doc.autoTable.previous.finalY + 20;
            }
        }

        addSectionTitle('6.5 Evaluation des substances non intentionnellement ajoutées');
        if (formData['nias-eval-done'] && formData['nias-eval-done'].includes('on')) {
            doc.text('• Evaluation des risques (Article 3 du Règlement (CE) n° 1935/2004) effectuée', 40, y); y += 20;
        } else {
            addParagraph('• A défaut, lister substances et informations pertinentes pour l’évaluation des risques');
            if (formData['nias-table'] && formData['nias-table'].length > 0) {
                doc.autoTable({
                    startY: y,
                    head: [['Nom', 'Identification CAS - EINECS – N° de Réf. MCDA', 'Commentaires (quantités, tests…)']],
                    body: formData['nias-table'].map(r => [r.name, r.id, r.comments]),
                    theme: 'striped',
                    headStyles: { fillColor: [0, 90, 158] },
                    didDrawPage: (data) => { y = data.cursor.y; addHeader(); }
                });
                y = doc.autoTable.previous.finalY + 20;
            }
        }

        addSectionTitle('6.6 Test(s) sensoriel(s)');
        if (formData['sensory-test-done'] && formData['sensory-test-done'].includes('on')) {
            doc.text('• Test réalisé :', 40, y); y += 20;
            addField('', formData['sensory-test-details']);
        }

        // Section 8
        addSectionTitle('8. Pièces jointes - Documents justificatifs');
        addParagraph('Fichiers joints : ' + (formData['attached-files'] ? formData['attached-files'].join(', ') : 'Aucun'));

        // Section 9
        addSectionTitle('7. Signature et validité');
        addField('Fait à', formData['doc-location']);
        addField('Le', formData['doc-date']);
        if (formData.signature) {
            checkPageBreak(100);
            doc.text('(Signature et cachet de la société)', 40, y); // Static text for signature
            doc.addImage(formData.signature, 'PNG', 40, y + 10, 150, 75);
            y += 100;
        }

        addFooter();
        return doc;
    }

});
