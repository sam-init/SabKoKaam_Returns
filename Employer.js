
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle for secondary sidebar
    const backButton = document.querySelector('.back-button');
    const secondarySidebar = document.querySelector('.secondary-sidebar');
    
    if (backButton && secondarySidebar) {
        let isSidebarOpen = false;
        
        // Function to toggle sidebar on mobile
        function toggleSidebar() {
            if (window.innerWidth <= 768) {
                if (isSidebarOpen) {
                    secondarySidebar.classList.remove('active');
                } else {
                    secondarySidebar.classList.add('active');
                }
                isSidebarOpen = !isSidebarOpen;
            }
        }
        
        backButton.addEventListener('click', toggleSidebar);
        
        // Close sidebar when clicking outside of it on mobile
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768 && isSidebarOpen) {
                if (!secondarySidebar.contains(event.target) && !backButton.contains(event.target)) {
                    secondarySidebar.classList.remove('active');
                    isSidebarOpen = false;
                }
            }
        });
    }
    
    // Sidebar feature navigation
    const sidebarIcons = document.querySelectorAll('.sidebar-icon');
    const featureContents = document.querySelectorAll('.feature-content');
    const featureMenus = document.querySelectorAll('[id$="-menu"]');
    const featureTitle = document.querySelector('.feature-title');
    
    // Initialize the sidebar features
    sidebarIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the feature name from data attribute
            const feature = this.getAttribute('data-feature');
            
            if (feature) {
                // Update active state of icons
                sidebarIcons.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // Hide all feature content sections
                featureContents.forEach(content => {
                    content.style.display = 'none';
                });
                
                // Hide all feature menus
                featureMenus.forEach(menu => {
                    menu.style.display = 'none';
                });
                
                // Show the selected feature content
                const selectedContent = document.getElementById(`${feature}-content`);
                if (selectedContent) {
                    selectedContent.style.display = 'block';
                }
                
                // Show the selected feature menu
                const selectedMenu = document.getElementById(`${feature}-menu`);
                if (selectedMenu) {
                    selectedMenu.style.display = 'block';
                }
                
                // Update the feature title in secondary sidebar
                if (featureTitle) {
                    // Convert kebab-case to Title Case
                    const formattedTitle = feature
                        .split('-')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                    
                    featureTitle.textContent = formattedTitle;
                }
                
                // Open the sidebar on mobile if it's closed
                if (window.innerWidth <= 768 && !isSidebarOpen) {
                    secondarySidebar.classList.add('active');
                    isSidebarOpen = true;
                }
            }
        });
    });
    
    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function() {
            // Here you would toggle a dropdown menu
            console.log('Dropdown clicked');
            // For a real implementation, you would add/remove a class to show the dropdown options
        });
    });
    
    // Favorite/Star functionality
    const starButtons = document.querySelectorAll('.action-button:first-child');
    
    starButtons.forEach(button => {
        button.addEventListener('click', function() {
            const starIcon = this.querySelector('i');
            
            if (starIcon.classList.contains('far')) {
                // Change to solid star (favorited)
                starIcon.classList.remove('far');
                starIcon.classList.add('fas');
            } else {
                // Change to regular star (unfavorited)
                starIcon.classList.remove('fas');
                starIcon.classList.add('far');
            }
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.opportunity-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add hover class or effect
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove hover effect
            this.style.boxShadow = '';
        });
    });
    
    // Responsive handling
    function handleResponsiveLayout() {
        if (window.innerWidth <= 768) {
            // Close secondary sidebar on mobile by default
            if (secondarySidebar) {
                secondarySidebar.classList.remove('active');
                isSidebarOpen = false;
            }
        }
    }
    
    // Run on page load
    handleResponsiveLayout();
    
    // Run on window resize
    window.addEventListener('resize', handleResponsiveLayout);
    
    // Simulate search functionality
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-box input');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log(`Searching for: ${searchTerm}`);
                // In a real app, you would perform a search and update the UI with results
                
                // Example of how you might update results count with an animation
                const countElement = document.querySelector('.opportunity-count h3');
                if (countElement) {
                    // Store original count
                    const originalText = countElement.textContent;
                    
                    // Update with "searching" message
                    countElement.textContent = 'Searching...';
                    
                    // Simulate search delay
                    setTimeout(() => {
                        // Update with new "filtered" count (this would be dynamic in a real app)
                        countElement.textContent = `We found ${Math.floor(Math.random() * 100) + 1} jobs matching "${searchTerm}"`;
                        
                        // Add clear search option
                        const clearSearch = document.createElement('button');
                        clearSearch.textContent = 'Clear search';
                        clearSearch.className = 'clear-search';
                        clearSearch.style.marginLeft = '10px';
                        clearSearch.style.border = 'none';
                        clearSearch.style.background = 'none';
                        clearSearch.style.color = 'var(--primary-color)';
                        clearSearch.style.cursor = 'pointer';
                        clearSearch.style.textDecoration = 'underline';
                        
                        // Clear search and restore original state
                        clearSearch.addEventListener('click', () => {
                            searchInput.value = '';
                            countElement.textContent = originalText;
                            clearSearch.remove();
                        });
                        
                        // If a clear button already exists, remove it first
                        const existingClearButton = countElement.querySelector('.clear-search');
                        if (existingClearButton) {
                            existingClearButton.remove();
                        }
                        
                        countElement.appendChild(clearSearch);
                    }, 500);
                }
            }
        });
        
        // Allow search on Enter key press
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
    
    // Feature-specific functionality
    
    // Create Job Posts - AI Button simulation
    const aiButtons = document.querySelectorAll('.ai-button');
    
    aiButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Simulate AI processing
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Completed';
                
                setTimeout(() => {
                    // Reset the button to original state
                    if (this.textContent.includes('Generate')) {
                        this.innerHTML = '<i class="fas fa-magic"></i> Generate Job Description';
                    } else if (this.textContent.includes('Bias')) {
                        this.innerHTML = '<i class="fas fa-check-circle"></i> Check for Bias';
                    } else if (this.textContent.includes('Predict')) {
                        this.innerHTML = '<i class="fas fa-chart-line"></i> Predict Applicant Rate';
                    }
                }, 2000);
            }, 1500);
        });
    });
    
    // Candidate Matching - Job selector
    const jobSelector = document.getElementById('job-selector');
    
    if (jobSelector) {
        jobSelector.addEventListener('change', function() {
            const selectedJob = this.value;
            
            if (selectedJob) {
                // Simulate loading state
                const matchingResults = document.querySelector('.matching-results');
                if (matchingResults) {
                    matchingResults.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Finding matches...</div>';
                    
                    // Simulate loading delay
                    setTimeout(() => {
                        // In a real app, you would dynamically generate new matches based on the selected job
                        // Here we just restore the original content
                        matchingResults.innerHTML = `
                            <div class="match-stats">
                                <div class="stat-card">
                                    <div class="stat-number">47</div>
                                    <div class="stat-label">Total Matches</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-number">12</div>
                                    <div class="stat-label">High Matches (>90%)</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-number">23</div>
                                    <div class="stat-label">Medium Matches</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-number">12</div>
                                    <div class="stat-label">Low Matches</div>
                                </div>
                            </div>
                            
                            <h3>Top Candidates</h3>
                            <div class="candidate-list">
                                <div class="candidate-card">
                                    <div class="candidate-info">
                                        <div class="candidate-photo">
                                            <img src="https://via.placeholder.com/50" alt="Candidate Photo">
                                        </div>
                                        <div class="candidate-details">
                                            <h4>Sarah Johnson</h4>
                                            <p>5 years experience • React, TypeScript, JavaScript</p>
                                        </div>
                                    </div>
                                    <div class="match-score">
                                        <div class="match-percentage">95%</div>
                                        <div class="match-label">Match</div>
                                    </div>
                                </div>
                                
                                <div class="candidate-card">
                                    <div class="candidate-info">
                                        <div class="candidate-photo">
                                            <img src="https://via.placeholder.com/50" alt="Candidate Photo">
                                        </div>
                                        <div class="candidate-details">
                                            <h4>Michael Chen</h4>
                                            <p>7 years experience • React, Redux, JavaScript</p>
                                        </div>
                                    </div>
                                    <div class="match-score">
                                        <div class="match-percentage">92%</div>
                                        <div class="match-label">Match</div>
                                    </div>
                                </div>
                                
                                <div class="candidate-card">
                                    <div class="candidate-info">
                                        <div class="candidate-photo">
                                            <img src="https://via.placeholder.com/50" alt="Candidate Photo">
                                        </div>
                                        <div class="candidate-details">
                                            <h4>Emily Rodriguez</h4>
                                            <p>4 years experience • React, Node.js, TypeScript</p>
                                        </div>
                                    </div>
                                    <div class="match-score">
                                        <div class="match-percentage">88%</div>
                                        <div class="match-label">Match</div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }, 1500);
                }
            }
        });
    }
    
    // Filter by Skill - Add/remove skills
    const skillOptions = document.querySelectorAll('.skill-option');
    const selectedSkills = document.querySelector('.selected-skills');
    
    if (skillOptions.length && selectedSkills) {
        skillOptions.forEach(option => {
            option.addEventListener('click', function() {
                const skillName = this.textContent.replace(' +', '');
                
                // Create a new skill tag
                const newSkill = document.createElement('div');
                newSkill.className = 'skill-tag';
                newSkill.innerHTML = `${skillName} <i class="fas fa-times"></i>`;
                
                // Add event listener to remove skill
                newSkill.querySelector('i').addEventListener('click', function() {
                    newSkill.remove();
                });
                
                // Add to selected skills
                selectedSkills.appendChild(newSkill);
                
                // Remove from options
                this.remove();
            });
        });
    }
    
    // Skill search functionality simulation
    const skillSearch = document.querySelector('.skill-search');
    const skillSuggestions = document.querySelector('.skill-suggestions');
    
    if (skillSearch && skillSuggestions) {
        skillSearch.addEventListener('input', function() {
            const searchTerm = this.value.trim().toLowerCase();
            
            if (searchTerm.length > 1) {
                // In a real app, you would fetch matched skills from the server
                // This is a simple simulation
                const mockSkills = ['CSS', 'Docker', 'Firebase', 'Python', 'SQL'];
                const matchedSkills = mockSkills.filter(skill => 
                    skill.toLowerCase().includes(searchTerm)
                );
                
                if (matchedSkills.length) {
                    // Create skill options for matches
                    skillSuggestions.innerHTML = '';
                    matchedSkills.forEach(skill => {
                        const option = document.createElement('div');
                        option.className = 'skill-option';
                        option.innerHTML = `${skill} <i class="fas fa-plus"></i>`;
                        
                        // Add click event to add the skill
                        option.addEventListener('click', function() {
                            const newSkill = document.createElement('div');
                            newSkill.className = 'skill-tag';
                            newSkill.innerHTML = `${skill} <i class="fas fa-times"></i>`;
                            
                            newSkill.querySelector('i').addEventListener('click', function() {
                                newSkill.remove();
                            });
                            
                            selectedSkills.appendChild(newSkill);
                            this.remove();
                        });
                        
                        skillSuggestions.appendChild(option);
                    });
                }
            }
        });
    }
    
    // Calendar interaction for Interview Scheduler
    const calendarDays = document.querySelectorAll('.calendar-days > div');
    
    if (calendarDays.length) {
        calendarDays.forEach(day => {
            day.addEventListener('click', function() {
                // Remove current-day class from all days
                calendarDays.forEach(d => d.classList.remove('current-day'));
                
                // Add current-day class to clicked day
                this.classList.add('current-day');
                
                // In a real app, you would update the interviews list based on the selected date
                // This is just a simple UI feedback
            });
        });
    }
    
    // Set the dashboard as active by default on page load
    document.querySelector('.sidebar-icon[data-feature="dashboard"]').click();
});
