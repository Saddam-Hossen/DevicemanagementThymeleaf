document.addEventListener('DOMContentLoaded', function () {
    const offcanvas = document.querySelector('.sideoffcanvus');
    const mainBody = document.querySelector('.mainBody');
    const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvas);

    // Set margin when offcanvas is shown
    offcanvas.addEventListener('shown.bs.offcanvas', function () {
        mainBody.style.marginLeft = '0px';
    });

    // Reset margin when offcanvas is hidden
    offcanvas.addEventListener('hidden.bs.offcanvas', function () {
        mainBody.style.marginLeft = '0';
    });

    // Click outside offcanvas to close it
    document.addEventListener('click', function (event) {
        const isClickInside = offcanvas.contains(event.target);
        const isToggler = event.target.closest('[data-bs-toggle="offcanvas"]');

        if (!isClickInside && !isToggler && offcanvas.classList.contains('show')) {
            bsOffcanvas.hide();
        }
    });

    // Section visibility logic
    const sectionContainer = document.querySelector('.container.mb-4');
    const numberOfChildren = sectionContainer.childElementCount;
    console.log('Number of children in <section class="container mb-4">:', numberOfChildren);

    for (let i = 0; i < numberOfChildren; i++) {
        sectionContainer.children[i].style.display = (i === 0) ? 'block' : 'none';
    }
});

// Nested list toggle
function toggleList(item) {
    document.querySelectorAll('.nested-list').forEach(list => {
        list.style.display = 'none';
    });

    const nestedList = item.querySelector('.nested-list');
    if (nestedList) nestedList.style.display = 'block';
}

// Show section by page name
function toggleListItem(item, pageName) {
    const sectionContainer = document.querySelector('.container.mb-4');
    const numberOfChildren = sectionContainer.childElementCount;

    for (let i = 0; i < numberOfChildren; i++) {
        const dataPage = sectionContainer.children[i].getAttribute('data-page');
        sectionContainer.children[i].style.display = (dataPage === pageName) ? 'block' : 'none';
    }
}
